"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[5825],{8553:(e,A,o)=>{o.r(A),o.d(A,{assets:()=>t,contentTitle:()=>i,default:()=>l,frontMatter:()=>c,metadata:()=>r,toc:()=>s});var a=o(4848),n=o(8453);const c={title:"Does Sodinokibi use bad crypto?",date:"2020-01-08",categories:["forensics","malware"],layout:"post",authors:["jasa"]},i="Crypto Stuff",r={permalink:"/blog/2020/01/08/does-sodinokibi-use-bad-crypto",source:"@site/blog/2020-01-08-does-sodinokibi-use-bad-crypto.mdx",title:"Does Sodinokibi use bad crypto?",description:"During the last days I was able to analyze a sample of the Sodinokibi ransomware (9fde430060112b2ebe83536cfd9de49d0cda04be1e7d83d848fbf68b30855fde).",date:"2020-01-08T00:00:00.000Z",tags:[],readingTime:3.72,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{title:"Does Sodinokibi use bad crypto?",date:"2020-01-08",categories:["forensics","malware"],layout:"post",authors:["jasa"]},unlisted:!1,prevItem:{title:"Importing Windows Event Logs into Elasticsearch",permalink:"/blog/2021/01/01/importing-windows-event-logs-into-elasticsearch"},nextItem:{title:'New Malware: "Pro InvoiceWMZ45445"',permalink:"/blog/2015/12/01/new-malware-pro-invoicewmz45445"}},t={authorsImageUrls:[void 0]},s=[{value:"nbody",id:"nbody",level:2},{value:"img",id:"img",level:2},{value:"Bad crypto",id:"bad-crypto",level:2},{value:"File size",id:"file-size",level:2},{value:"Domains",id:"domains",level:2}];function m(e){const A={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(A.p,{children:"During the last days I was able to analyze a sample of the Sodinokibi ransomware (9fde430060112b2ebe83536cfd9de49d0cda04be1e7d83d848fbf68b30855fde)."}),"\n",(0,a.jsxs)(A.p,{children:["During the dynamic investigation I discovered that the malware contains a PE section named ",(0,a.jsx)(A.code,{children:".lfge4i"}),". The content of this section is being decoded during execution and contains the following content (I formatted it to improve readability):"]}),"\n",(0,a.jsx)(A.pre,{children:(0,a.jsx)(A.code,{className:"language-json",children:' {\n   "pk":"3sB5vqBW0kuO3Nr56Ql+TMjaDchoEjxcKxBA/XbSJks=",\n   "pid":"48",\n   "sub":"2360",\n   "dbg":false,\n   "fast":false,\n   "wipe":true,\n   "wht":{\n      "fld":[\n         "$windows.~bt",\n         "program files",\n         "google",\n         "program files (x86)",\n         "boot",\n         "msocache",\n         "system volume information",\n         "mozilla",\n         "application data",\n         "appdata",\n         "perflogs",\n         "tor browser",\n         "programdata",\n         "windows",\n         "$recycle.bin",\n         "$windows.~ws",\n         "windows.old",\n         "intel"\n      ],\n      "fls":[\n         "iconcache.db",\n         "bootfont.bin",\n         "bootsect.bak",\n         "thumbs.db",\n         "ntuser.ini",\n         "ntldr",\n         "autorun.inf",\n         "boot.ini",\n         "ntuser.dat",\n         "desktop.ini",\n         "ntuser.dat.log"\n      ],\n      "ext":[\n         "com",\n         "bat",\n         "cur",\n         "scr",\n         "diagpkg",\n         "lnk",\n         "icl",\n         "diagcfg",\n         "lock",\n         "msc",\n         "msu",\n         "ani",\n         "cpl",\n         "386",\n         "hta",\n         "cmd",\n         "ocx",\n         "shs",\n         "hlp",\n         "exe",\n         "ico",\n         "nls",\n         "adv",\n         "bin",\n         "icns",\n         "theme",\n         "drv",\n         "wpx",\n         "spl",\n         "cab",\n         "msstyles",\n         "sys",\n         "msi",\n         "themepack",\n         "msp",\n         "mpa",\n         "deskthemepack",\n         "key",\n         "idx",\n         "mod",\n         "rom",\n         "prf",\n         "nomedia",\n         "dll",\n         "diagcab",\n         "ps1",\n         "ics",\n         "rtp",\n         "ldf"\n      ]\n   },\n   "wfld":[\n      "backup"\n   ],\n   "prc":[\n      "xfssvccon",\n      "thebat",\n      "firefox",\n      "dbsnmp",\n      "synctime",\n      "mydesktopqos",\n      "msaccess",\n      "outlook",\n      "tbirdconfig",\n      "isqlplussvc",\n      "mydesktopservice",\n      "steam",\n      "visio",\n      "wordpad",\n      "winword",\n      "infopath",\n      "agntsvc",\n      "mspub",\n      "ocomm",\n      "ocautoupds",\n      "encsvc",\n      "powerpnt",\n      "thunderbird",\n      "oracle",\n      "onenote",\n      "sql",\n      "excel",\n      "ocssd",\n      "dbeng50",\n      "sqbcoreservice"\n   ],\n   "dmn":"letterscan.de;evsynthacademy.org;avtoboss163.ru:443;brinkdoepke.eu;cp-bap.de;landgoedspica.nl;greenrider.nl;lunoluno.com;cymru.futbol;kdbrh.com;from02pro.com;thegrinningmanmusical.com;cleanroomequipment.ie;jlgraphisme.fr;awaisghauri.com;internalresults.com;internestdigital.com;pajagus.fr;larchwoodmarketing.com;askstaffing.com;beandrivingschool.com.au;utilisacteur.fr;ziliak.com;auberives-sur-vareze.fr;aheadloftladders.co.uk;ox-home.com;liverpoolabudhabi.ae;jayfurnitureco.com;agriturismocastagneto.it;jmmartinezilustrador.com;airserviceunlimited.com;nginx.com;amelielecompte.wordpress.com;eurethicsport.eu;funworx.de;hotelturbo.de;collegetennis.info;successcolony.com.ng;gardenpartner.pl;cotton-avenue.co.il;k-v-f.de;sarahspics.co.uk;phukienbepthanhdat.com;devus.de;universelle.fr;fla.se;hekecrm.com;agendatwentytwenty.com;tastevirginia.com;geoweb.software;valiant-voice.com;webforsites.com;tbalp.co.uk;espaciopolitica.com;jalkapuu.net;rossomattonecase.it;pedmanson.com;globalskills.pt;epsondriversforwindows.com;suitesartemis.gr;drvoip.com;dayenne-styling.nl;eastgrinsteadwingchun.com;boloria.de;muni.pe;angelsmirrorus.com;bcmets.info;mundo-pieces-auto.fr;makingmillionaires.net;yvesdoin-aquarelles.fr;furland.ru;saboboxtel.uk;baikalflot.ru;anleggsregisteret.no;yuanshenghotel.com;hnkns.com;ygallerysalonsoho.com:443;gavelmasters.com;chinowarehousespace.com;strauchs-wanderlust.info;bulyginnikitav.000webhostapp.com;lexced.com;iexpert99.com;lgiwines.com;kellengatton.com;sytzedevries.com;veggienessa.com;antesacademy.it;mustangmarketinggroup.com;professionetata.com;alcye.com;mieleshopping.it;digitale-elite.de;floweringsun.org;frankgoll.com;kryddersnapsen.dk;christianscholz.de;tatyanakopieva.ru;uci-france.fr;zdrowieszczecin.pl;kickittickets.com;denhaagfoodie.nl;bodet150ans.com;fbmagazine.ru;cookinn.nl;vdolg24.online;onlinetvgroup.com;abulanov.com;renderbox.ch;jaaphoekzema.nl;oportowebdesign.com;queertube.net;frimec-international.es;klapanvent.ru;indiebizadvocates.org;miscbo.it;aktivfriskcenter.se;yourcosmicbeing.com;t3brothers.com;springfieldplumbermo.com;saint-malo-developpement.fr;innovationgames-brabant.nl;bohrlochversicherung.info;bertbutter.nl;3daywebs.com;forextimes.ru;dentallabor-luenen.de;specialtyhomeservicesllc.com;molinum.pt;cmeow.com;teethinadaydentalimplants.com;mrmac.com;acornishstudio.co.uk;ronaldhendriks.nl;jlwilsonbooks.com;campusce.com;kryptos72.com;levencovka.ru;stressreliefadvice.com;sjtpo.org;harleystreetspineclinic.com;dentourage.com;elex.is;fotoeditores.com;mursall.de;hostingbangladesh.net;alnectus.com;unexplored.gr;reputation-medical.online;smartspeak.com;sololibrerie.it;janasfokus.com;fixx-repair.com;agenceassemble.fr;unboxtherapy.site;bundan.com;arazi.eus;patassociation.com;magrinya.net;hotjapaneselesbian.com;lovcase.com;morgansconsult.com;skinkeeper.li;omnicademy.com;tetameble.pl;albcleaner.fr;fotoslubna.com;nrgvalue.com;elitkeramika-shop.com.ua;mariamalmahdi.com;wademurray.com;testitjavertailut.net;skidpiping.de;ya-elka.ru;alharsunindo.com;theboardroomafrica.com;theintellect.edu.pk;matteoruzzaofficial.com;jimprattmediations.com;vapiano.fr;perceptdecor.com;gurutechnologies.net;photonag.com;laaisterplakky.nl;globalcompliancenews.com;voice2biz.com;phoenixcrane.com;mondolandscapes.com;datatri.be;scotlandsroute66.co.uk;slotenmakerszwijndrecht.nl;a-zpaperwork.eu;descargandoprogramas.com;cincinnatiphotocompany.org;directique.com;claudiakilian.de;sealgrinderpt.com;stringnosis.academy;arabianmice.com;bjornvanvulpen.nl;jdscenter.com;pokemonturkiye.com;billyoart.com;the-beauty-guides.com;kompresory-opravy.com;mjk.digital;slotspinner.com;enactusnhlstenden.com;hvitfeldt.dk;julielusktherapy.com;juergenblaetz.de;tweedekansenloket.nl;carolynfriedlander.com;leadforensics.com;protoplay.ca;ronielyn.com;lsngroupe.com;richardmaybury.co.uk;oro.ae;nauticmarine.dk;whoopingcrane.com;towelroot.co;prodentalblue.com;mazzaropi.com.br;clemenfoto.dk;comoserescritor.com;modamarfil.com;wallflowersandrakes.com;awag-blog.de;goodherbalhealth.com;ivancacu.com;kelsigordon.com;primemarineengineering.com;linkbuilding.life;jobstomoveamerica.org;scietech.academy;apiarista.de;goodboyscustom.com;jeanmonti.com;greeneyetattoo.com;boomerslivinglively.com;rozmata.com;so-sage.fr;andreaskildegaard.dk;hutchstyle.co.uk;atrgroup.it;witraz.pl;leopoldineroux.com;katherinealy.com;angeleyezstripclub.com;geitoniatonaggelon.gr;acb-gruppe.ch;hostastay.com;quitescorting.com;malzomattalar.com;scentedlair.com;o2o-academy.com;alpesiberie.com;reizenmetkinderen.be;aslog.fr;lagschools.ng;monstarrsoccer.com;mbuildinghomes.com;altitudeboise.com;stitch-n-bitch.com;holocine.de;werkzeugtrolley.net;limounie.com;lapponiasafaris.com;markseymourphotography.co.uk;fire-space.com;transifer.fr;bmw-i-pure-impulse.com;ruggestar.ch;malevannye.ru;curtsdiscountguns.com;ultimatelifesource.com;lattalvor.com;operativadigital.com;buerocenter-butzbach-werbemittel.de;advanced-removals.co.uk;artvark.nl;eksperdanismanlik.com;alattekniksipil.com;focuskontur.com;latteswithleslie.com;goeppinger-teppichreinigung.de;advancedeyecare.com;silkeight.com;theater-lueneburg.de;hameghlim.com;bridalcave.com;turing.academy;marmarabasin.com;bodymindchallenger.com;o90.dk;g2mediainc.com;smarttourism.academy;xn--ziinoapte-6ld.ro;computer-place.de;distrifresh.com;test-teleachat.fr;rhino-storage.co.uk;mediogiro.com.ar;spartamovers.com;circuit-diagramz.com;blavait.fr;adedesign.com;sshomme.com;vipcarrental.ae;bg.szczecin.pl;craftingalegacy.com;tzn.nu;acumenconsultingcompany.com;kroophold-sjaelland.dk;flossmoordental.com;simpleitsolutions.ch;tilldeeke.de;martinipstudios.com;sochi-okna23.ru;foerderverein-vatterschule.de;carmel-york.com;metriplica.academy;axisoflove.org:443;heuvelland-oaze.nl;putzen-reinigen.com;physio-lang.de;skolaprome.eu;lmmont.sk;boyfriendsgoal.site;edrickennedymacfoy.com;cuadc.org;thenalpa.com;startuplive.org;finsahome.co.uk;heimdalbygg.no;stoneridgemontessori.com;inewsstar.com;carsten.sparen-it.de;fann.ru;topautoinsurers.net;mazift.dk;line-x.co.uk;hoteltantra.com;graygreenbiomedservices.com;powershell.su;spectamarketingdigital.com.br;wrinstitute.org;scholarquotes.com;rsidesigns.com;levelseven.be;narca.net;relevantonline.eu;jollity.hu;walterman.es;campusescalade.com;slideevents.be;diakonie-weitramsdorf-sesslach.de;brighthillgroup.com;perfectgrin.com;initconf.com;loparnille.se;nuohous.com;mesajjongeren.nl;pazarspor.org.tr;cssp-mediation.org;gta-jjb.fr;centuryvisionglobal.com;ownidentity.com;rivermusic.nl;imagine-entertainment.com;linearete.com;publicompserver.de;allinonecampaign.com;keuken-prijs.nl;bumbipdeco.site;alwaysdc.com;sprintcoach.com;drbenveniste.com;buzzneakers.com;dmlcpa.com;edvestors.org;dcc-eu.com;nalliasmali.net;hepishopping.com;worldproskitour.com;sachainchiuk.com;michaelfiegel.com;kafkacare.com;mikegoodfellow.co.uk;rolleepollee.com;almamidwifery.com;hawaiisteelbuilding.com;bluelakevision.com;mike.matthies.de;afbudsrejserallinclusive.dk;trainiumacademy.com;insane.agency;peppergreenfarmcatering.com.au;2020hindsight.info;mangimirossana.it;ebible.co;leloupblanc.gr;avisioninthedesert.com;sbit.ag;maxcube24.com.ua;oexebusiness.com;vitoriaecoturismo.com.br;christopherhannan.com;mercadodelrio.com;ikzoekgod.be;glas-kuck.de;kartuindonesia.com;orchardbrickwork.com;bescomedical.de;mediabolmong.com;maryairbnb.wordpress.com;dreamvoiceclub.org;housesofwa.com;paprikapod.com;csaballoons.com;ikadomus.com;mac-computer-support-hamburg.de;die-immo-agentur.de;licensed-public-adjuster.com;fysiotherapierijnmond.nl;nutriwell.com.sg;rattanwarehouse.co.uk;alaskaremote.com;eos-horlogerie.com;karelinjames.com;pourlabretagne.bzh;iactechnologies.net;ingresosextras.online;jakubrybak.com;nicksrock.com;ykobbqchicken.ca;netadultere.fr;nvisionsigns.com;production-stills.co.uk;onesynergyinternational.com;placermonticello.com;schlagbohrmaschinetests.com;mamajenedesigns.com;pankiss.ru;olry-cloisons.fr;rarefoods.ro;agrifarm.dk;betterce.com;kemtron.fr;littlesaints.academy;keyboardjournal.com;hinotruckwreckers.com.au;encounter-p.net;pharmeko-group.com;taulunkartano.fi;apmollerpension.com;5thactors.com;cap29010.it;metcalfe.ca;9nar.com;xn--80abehgab4ak0ddz.xn--p1ai;glennverschueren.be;solidhosting.nl;tutvracks.com;sveneulberg.de;factoriareloj.com;creohn.de;bajova.sk;manzel.tn;cops4causes.org;vvego.com;penumbuhrambutkeiskei.com;parseport.com;factorywizuk.com;oraweb.net;johnstonmingmanning.com;p-ride.live;matthieupetel.fr;limmortelyouth.com;premiumweb.com.ua:443;hiddensee-buhne11.de;switch-made.com;nationnewsroom.com;go.labibini.ch;electricianul.com;ceocenters.com;pvandambv.nl;selected-minds.de;four-ways.com;speiserei-hannover.de;skooppi.fi;agencewho-aixenprovence.fr;benchbiz.com;fta-media.com;innervisions-id.com;bourchier.org;cmascd.com;denverwynkoopdentist.com;jobscore.com;subquercy.fr;ahgarage.com;wordpress.idium.no;khtrx.com;ncn.nl;chomiksy.net;goddardleadership.org;toranjtuition.org;thestudio.academy;hensleymarketing.com;bayshoreelite.com;mgimalta.com;guohedd.com;brisbaneosteopathic.com.au;stralsund-ansichten.de;redpebblephotography.com;amorbellezaysalud.com;bellesiniacademy.org;letsstopsmoking.co.uk;amco.net.au;haus-landliebe.de;look.academy;tieronechic.com;expohomes.com;rizplakatjaya.com;blueridgeheritage.com;renehartman.nl;rino-gmbh.com;yayasanprimaunggul.org;ufovidmag.com;ocduiblog.com;breakluckrecords.com;myplaywin3.com;nexstagefinancial.com;ncjc.ca;envomask.com;mindfuelers.com;buffdaddyblog.com;the-cupboard.co.uk;concontactodirecto.com;marcandy.com;bratek-immobilien.de;log-barn.co.uk;rechtenplicht.be;victorvictoria.com;jobkiwi.com.ng;domilivefurniture.com;citiscapes-art.com;nbva.co.uk;smartworkplaza.com;altocontatto.net;rentingwell.com;advance-refle.com;wasnederland.nl;cyberpromote.de;supercarhire.co.uk;encounter-p.net;moira-cristescu.com;stanleyqualitysystems.com;lyricalduniya.com;memphishealthandwellness.com;c-sprop.com;jglconsultancy.com;humanviruses.org;texanscan.org;pureelements.nl;dieetuniversiteit.nl;palmenhaus-erfurt.de;egpu.fr;clinic-beethovenstrasse-ag.ch;pinkxgayvideoawards.com;lidkopingsnytt.nu;thiagoperez.com;arthakapitalforvaltning.dk;business-basic.de;mollymccarthydesign.com;trevi-vl.ru;gbk-tp1.de;grupoexin10.com;aciscomputers.com;zumrutkuyutemel.com;paardcentraal.nl;dinedrinkdetroit.com;affligemsehondenschool.be;spirello.nl;adterium.com;luvbec.com;alltagsrassismus-entknoten.de;georgemuncey.com;unislaw-narty.pl;poems-for-the-soul.ch;legundschiess.de;yournextshoes.com;sweetz.fr;m2graph.fr;rentsportsequip.com;berdonllp.com;chatterchatterchatter.com;glende-pflanzenparadies.de;ledyoucan.com;mediahub.co.nz;daveystownhouse.com;bendel-partner.de;galatee-couture.com;loysonbryan.com;kristianboennelykke.dk;catchup-mag.com;deziplan.ru;thepixelfairy.com;ziliak.com;cascinarosa33.it;dantreranch.com;grancanariaregional.com;invela.dk;gosouldeep.com;finnergo.eu;zealcon.ae;achetrabalhos.com;bruut.online;kerstliedjeszingen.nl;fi-institutionalfunds.com;sber-biznes.com;alexwenzel.de;amyandzac.com;schroederschoembs.com;adabible.org;chainofhopeeurope.eu;1deals.com;block-optic.com;auto-opel.ro;fidelitytitleoregon.com;teutoradio.de;billscars.net;craftstone.co.nz;happycatering.de;rhino-turf.com;reygroup.pt;rokthetalk.com;web865.com;fazagostar.co;craftron.com;anchelor.com;drnelsonpediatrics.com;subyard.com;avis.mantova.it;triplettabordeaux.fr;bakingismyyoga.com;karmeliterviertel.com;techybash.com;acibademmobil.com.tr;ziliak.com;johnkoen.com;precisetemp.com;nieuwsindeklas.be;forskolinslimeffect.net;rubyaudiology.com;muller.nl;annida.it;watchsale.biz;breathebettertolivebetter.com;rvside.com;davedavisphotos.com;welovecustomers.fr;futurenetworking.com;tanatek.com;pinthelook.com;azerbaycanas.com;ideamode.com;rename.kz;endlessrealms.net;astrographic.com;kamin-somnium.de;napisat-pismo-gubernatoru.ru:443;jag.me;pilotgreen.com;biketruck.de;circlecitydj.com;dierenambulancealkmaar.nl;alene.co;mrkluttz.com;animation-pro.co.uk;bd2fly.com;frameshift.it;theatre-embellie.fr;gsconcretecoatings.com;topvijesti.net;neonodi.be;jameswilliamspainting.com;outstandingminialbums.com;awaitspain.com;mind2muscle.nl;n-newmedia.de;wg-heiligenstadt.de;motocrosshideout.com;ntinasfiloxenia.gr;patriotcleaning.net;baita.ac;min-virksomhed.dk;chorusconsulting.net;activeterroristwarningcompany.com;entdoctor-durban.com;fsbforsale.com;birthplacemag.com;smartmind.net;endstarvation.com;proffteplo.com;90nguyentuan.com;palema.gr;cardsandloyalty.com;jax-interim-and-projectmanagement.com;thegetawaycollective.com;midwestschool.org;omegamarbella.com;enews-qca.com;trivselsguide.dk;sambaglow.com;kiraribeaute-nani.com;mindsparkescape.com;opt4cdi.com;zuerich-umzug.ch;yourhappyevents.fr;magnetvisual.com;arearugcleaningnyc.com;111firstdelray.com;bubbalucious.com;richardkershawwines.co.za;site.markkit.com.br;wribrazil.com;gazelle-du-web.com;animalfood-online.de;redctei.co;dinecorp.com;innersurrection.com;donau-guides.eu;imaginekithomes.co.nz;husetsanitas.dk;the3-week-diet.net;catalyseurdetransformation.com;blucamp.com;wyreforest.net;tchernia-conseil.fr;tages-geldvergleich.de;brunoimmobilier.com;onlinemarketingsurgery.co.uk;akwaba-safaris.com;charlesfrancis.photos;rs-danmark.dk;etgdogz.de;promus.ca;thisprettyhair.com;istantidigitali.com;artcase.pl;interlinkone.com;kenmccallum.com;casinodepositors.com;beauty-traveller.com;triavlete.com;banukumbak.com;mahikuchen.com;verbouwingsdouche.nl;galaniuklaw.com;livelai.com;eventosvirtualesexitosos.com;chris-anne.com;secrets-clubs.co.uk;myfbateam.com;the5thquestion.com;voetbalhoogeveen.nl;sunsolutions.es;kookooo.com;janellrardon.com;explora.nl;haard-totaal.nl;diverfiestas.com.es;druktemakersheerenveen.nl;neolaiamedispa.com;catering.com;optigas.com;nepressurecleaning.com;dogsunlimitedguide.com;innovationgames-brabant.nl;ciga-france.fr;peninggibadan.co.id;belofloripa.be;ilveshistoria.com;silverbird.dk;paradigmlandscape.com;asiaartgallery.jp;suonenjoen.fi;framemyballs.com;vedsegaard.dk;projektparkiet.pl;agora-collectivites.com;belinda.af;xn--billigafrgpatroner-stb.se;profibersan.com;fluzfluzrewards.com;nevadaruralhousingstudies.org;atma.nl;qandmmusiccenter.com;aidanpublishing.co.uk;andrealuchesi.it;molade.nl;mayprogulka.ru;bringmehope.org;forumsittard.nl;eatyoveges.com;raeoflightmusic.com;elliemaccreative.wordpress.com;barbaramcfadyenjewelry.com;delegationhub.com;cainlaw-okc.com;hom-frisor.dk;terraflair.de;mensemetgesigte.co.za;soncini.ch;lifeinbreaths.com;lashandbrowenvy.com;pansionatblago.ru;ijsselbeton.nl;deduktia.fi;jandhpest.com;advesa.com;photographycreativity.co.uk;cl0nazepamblog.com;dentalcircle.com;handyman-silkeborg.dk;biodentify.ai;global-migrate.com;pxsrl.it;andermattswisswatches.ch;krishnabrawijaya.com;janmorgenstern.com;akcadagofis.com;designimage.ae;sharonalbrightdds.com;brownswoodblog.com;aoyama.ac;rtc24.com;shrinkingplanet.com;aberdeenartwalk.org;imajyuku-sozoku.com;qrs-international.com;azloans.com;kenmccallum.com;energosbit-rp.ru;xrresources.com;basindentistry.com;corporacionrr.com;kuriero.pro;pro-gamer.pl;shortsalemap.com;logosindustries.com;rishigangoly.com;salonlamar.nl;latableacrepes-meaux.fr;pisofare.co;mslp.org;colored-shelves.com;kombi-dress.com;oscommunity.de;natturestaurante.com.br;qwikcoach.com;coachpreneuracademy.com;dr-vita.de;metroton.ru;alabamaroofingllc.com;lassocrm.com;grafikstudio-visuell.de;xtensifi.com;spacebel.be;lookandseen.com;greatofficespaces.net;koncept-m.ru;tothebackofthemoon.com;thesilkroadny.com;skyboundnutrition.co.uk;stagefxinc.com;crestgood.com;luvinsburger.fr;teamsegeln.ch;buonabitare.com;fridakids.com;sppdstats.com;rapid5kloan.org;radishallgood.com;soundseeing.net;louiedager.com;martha-frets-ceramics.nl;bilius.dk;triplettagaite.fr;k-zubki.ru;atelierkomon.com;osn.ro;bonitabeachassociation.com;ludoil.it;broccolisoep.nl;mrcar.nl;hypogenforensic.com;parentsandkids.com;pubcon.com;parisschool.ru;citydogslife.com;medicalsupportco.com;gaearoyals.com;prometeyagro.com.ua;bluetenreich-brilon.de;volta.plus;der-stempelking.de;girlish.ae;tellthebell.website;cac2040.com;leatherjees.com;skoczynski.eu;airvapourbarrier.com;devplus.be;golfclublandgoednieuwkerk.nl;bcabattoirs.org;johnsonweekly.com;happylublog.wordpress.com;wineandgo.hu;oththukaruva.com;b3b.ch;direitapernambuco.com;michal-s.co.il;ninjaki.com;speakaudible.com;saberconcrete.com;docarefoundation.org;hartofurniture.com;lovetzuchia.com;duthler.nl;therapybusinessacademy.com;stabilisateur.fr;bluemarinefoundation.com;customroasts.com;jonnyhooley.com;otpusk.zp.ua;palmecophilippines.com;fanuli.com.au;biblica.com;aquacheck.co.za;nepal-pictures.com;campinglaforetdetesse.com;premier-iowa.com;cormanmarketing.com;baptistdistinctives.org;charlottelhanna.com;zwemofficial.nl;plbinsurance.com;augen-praxisklinik-rostock.de;fskhjalmar.se;xn--80addfr4ahr.dp.ua;bychowo.pl;satoblog.org;purepreprod4.com;drbrianhweeks.com;eafx.pro;nourella.com;gatlinburgcottage.com;cc-experts.de;fitnessblenderstory.com;autoteamlast.de;studionumerik.fr;metallbau-hartmann.eu;pixelhealth.net;randyabrown.com;itheroes.dk;lollachiro.com;adaduga.info;smartercashsystem.com;ced-elec.com;sellthewrightway.com;solutionshosting.co.uk;dennisverschuur.com;piestar.com;ruggestar.ch;pays-saint-flour.fr;shortysspices.com;ramirezprono.com;groovedealers.ru;bavovrienden.nl;traitware.com;5pointpt.com;oncarrot.com;masecologicos.com;kausette.com;iron-mine.ru;burg-zelem.de;laylavalentine.com;skyscanner.ro;schluesseldienste-hannover.de;mariannelemenestrel.com;hostaletdelsindians.es;banksrl.co.za;jacquesgarcianoto.com;liepertgrafikweb.at;11.in.ua;livedeveloper.com;irizar.com;santastoy.store;lesyeuxbleus.net;dibli.store;naukaip.ru;sycamoregreenapts.com;margaretmcshane.com;fascaonline.com;richardiv.com;signamedia.de;motocrossplace.co.uk;brannbornfastigheter.se;profiz.com;cesep2019.com;leijstrom.com;nxtstg.org;opticahubertruiz.com;kosten-vochtbestrijding.be;zaczytana.com;thehovecounsellingpractice.co.uk;polynine.com;ayudaespiritualtamara.com;billigeflybilletter.dk;singletonfinancial.com;stathmoulis.gr;noda.com.ua;alisodentalcare.com;stage-infirmier.fr;vitormmcosta.com;kvetymichalovce.sk;ravage-webzine.nl;tecleados.com;hospitalitytrainingsolutions.co.uk;liveyourheartout.co;uncensoredhentaigif.com;signededenroth.dk;domaine-des-pothiers.com;epicjapanart.com;zorgboerderijravensbosch.nl;chatberlin.de;zinnystar.com;parksideseniorliving.net;jefersonalessandro.com;gratiocafeblog.wordpress.com;bookingwheel.com;nykfdyrehospital.dk;apogeeconseils.fr;ilovefullcircle.com;mneti.ru;justaroundthecornerpetsit.com;tramadolhealth.com;condormobile.fr;mariajosediazdemera.com;cxcompany.com;tradenavigator.ch;wirmuessenreden.com;tesisatonarim.com;schulz-moelln.de;leansupremegarcinia.net;ketomealprep.academy;riffenmattgarage.ch;ddmgen.com;annenymus.com;racefietsenblog.nl;hawthornsretirement.co.uk;efficiencyconsulting.es;lisa-poncon.fr;babysitting-hk.helpergo.co;hm-com.com;easydental.ae;dnqa.co.uk;newonestop.com;eyedoctordallas.com;baumfinancialservices.com;weddingceremonieswithtim.com;angelika-schwarz.com;lumturo.academy;eshop.design;aceroprime.com;bagaholics.in",\n   "net":false,\n   "svc":[\n      "mepocs",\n      "veeam",\n      "sql",\n      "vss",\n      "sophos",\n      "memtas",\n      "backup",\n      "svc$"\n   ],\n   "nbody":"LQAtAC0APQA9AD0AIABXAGUAbABjAG8AbQBlAC4AIABBAGcAYQBpAG4ALgAgAD0APQA9AC0ALQAtAA0ACgANAAoAWwArAF0AIABXAGgAYQB0AHMAIABIAGEAcABwAGUAbgA/ACAAWwArAF0ADQAKAA0ACgBZAG8AdQByACAAZgBpAGwAZQBzACAAYQByAGUAIABlAG4AYwByAHkAcAB0AGUAZAAsACAAYQBuAGQAIABjAHUAcgByAGUAbgB0AGwAeQAgAHUAbgBhAHYAYQBpAGwAYQBiAGwAZQAuACAAWQBvAHUAIABjAGEAbgAgAGMAaABlAGMAawAgAGkAdAA6ACAAYQBsAGwAIABmAGkAbABlAHMAIABvAG4AIAB5AG8AdQByACAAcwB5AHMAdABlAG0AIABoAGEAcwAgAGUAeAB0AGUAbgBzAGkAbwBuACAAewBFAFgAVAB9AC4ADQAKAEIAeQAgAHQAaABlACAAdwBhAHkALAAgAGUAdgBlAHIAeQB0AGgAaQBuAGcAIABpAHMAIABwAG8AcwBzAGkAYgBsAGUAIAB0AG8AIAByAGUAYwBvAHYAZQByACAAKAByAGUAcwB0AG8AcgBlACkALAAgAGIAdQB0ACAAeQBvAHUAIABuAGUAZQBkACAAdABvACAAZgBvAGwAbABvAHcAIABvAHUAcgAgAGkAbgBzAHQAcgB1AGMAdABpAG8AbgBzAC4AIABPAHQAaABlAHIAdwBpAHMAZQAsACAAeQBvAHUAIABjAGEAbgB0ACAAcgBlAHQAdQByAG4AIAB5AG8AdQByACAAZABhAHQAYQAgACgATgBFAFYARQBSACkALgANAAoADQAKAFsAKwBdACAAVwBoAGEAdAAgAGcAdQBhAHIAYQBuAHQAZQBlAHMAPwAgAFsAKwBdAA0ACgANAAoASQB0AHMAIABqAHUAcwB0ACAAYQAgAGIAdQBzAGkAbgBlAHMAcwAuACAAVwBlACAAYQBiAHMAbwBsAHUAdABlAGwAeQAgAGQAbwAgAG4AbwB0ACAAYwBhAHIAZQAgAGEAYgBvAHUAdAAgAHkAbwB1ACAAYQBuAGQAIAB5AG8AdQByACAAZABlAGEAbABzACwAIABlAHgAYwBlAHAAdAAgAGcAZQB0AHQAaQBuAGcAIABiAGUAbgBlAGYAaQB0AHMALgAgAEkAZgAgAHcAZQAgAGQAbwAgAG4AbwB0ACAAZABvACAAbwB1AHIAIAB3AG8AcgBrACAAYQBuAGQAIABsAGkAYQBiAGkAbABpAHQAaQBlAHMAIAAtACAAbgBvAGIAbwBkAHkAIAB3AGkAbABsACAAbgBvAHQAIABjAG8AbwBwAGUAcgBhAHQAZQAgAHcAaQB0AGgAIAB1AHMALgAgAEkAdABzACAAbgBvAHQAIABpAG4AIABvAHUAcgAgAGkAbgB0AGUAcgBlAHMAdABzAC4ADQAKAFQAbwAgAGMAaABlAGMAawAgAHQAaABlACAAYQBiAGkAbABpAHQAeQAgAG8AZgAgAHIAZQB0AHUAcgBuAGkAbgBnACAAZgBpAGwAZQBzACwAIABZAG8AdQAgAHMAaABvAHUAbABkACAAZwBvACAAdABvACAAbwB1AHIAIAB3AGUAYgBzAGkAdABlAC4AIABUAGgAZQByAGUAIAB5AG8AdQAgAGMAYQBuACAAZABlAGMAcgB5AHAAdAAgAG8AbgBlACAAZgBpAGwAZQAgAGYAbwByACAAZgByAGUAZQAuACAAVABoAGEAdAAgAGkAcwAgAG8AdQByACAAZwB1AGEAcgBhAG4AdABlAGUALgANAAoASQBmACAAeQBvAHUAIAB3AGkAbABsACAAbgBvAHQAIABjAG8AbwBwAGUAcgBhAHQAZQAgAHcAaQB0AGgAIABvAHUAcgAgAHMAZQByAHYAaQBjAGUAIAAtACAAZgBvAHIAIAB1AHMALAAgAGkAdABzACAAZABvAGUAcwAgAG4AbwB0ACAAbQBhAHQAdABlAHIALgAgAEIAdQB0ACAAeQBvAHUAIAB3AGkAbABsACAAbABvAHMAZQAgAHkAbwB1AHIAIAB0AGkAbQBlACAAYQBuAGQAIABkAGEAdABhACwAIABjAGEAdQBzAGUAIABqAHUAcwB0ACAAdwBlACAAaABhAHYAZQAgAHQAaABlACAAcAByAGkAdgBhAHQAZQAgAGsAZQB5AC4AIABJAG4AIABwAHIAYQBjAHQAaQBzAGUAIAAtACAAdABpAG0AZQAgAGkAcwAgAG0AdQBjAGgAIABtAG8AcgBlACAAdgBhAGwAdQBhAGIAbABlACAAdABoAGEAbgAgAG0AbwBuAGUAeQAuAA0ACgANAAoAWwArAF0AIABIAG8AdwAgAHQAbwAgAGcAZQB0ACAAYQBjAGMAZQBzAHMAIABvAG4AIAB3AGUAYgBzAGkAdABlAD8AIABbACsAXQANAAoADQAKAFkAbwB1ACAAaABhAHYAZQAgAHQAdwBvACAAdwBhAHkAcwA6AA0ACgANAAoAMQApACAAWwBSAGUAYwBvAG0AbQBlAG4AZABlAGQAXQAgAFUAcwBpAG4AZwAgAGEAIABUAE8AUgAgAGIAcgBvAHcAcwBlAHIAIQANAAoAIAAgAGEAKQAgAEQAbwB3AG4AbABvAGEAZAAgAGEAbgBkACAAaQBuAHMAdABhAGwAbAAgAFQATwBSACAAYgByAG8AdwBzAGUAcgAgAGYAcgBvAG0AIAB0AGgAaQBzACAAcwBpAHQAZQA6ACAAaAB0AHQAcABzADoALwAvAHQAbwByAHAAcgBvAGoAZQBjAHQALgBvAHIAZwAvAA0ACgAgACAAYgApACAATwBwAGUAbgAgAG8AdQByACAAdwBlAGIAcwBpAHQAZQA6ACAAaAB0AHQAcAA6AC8ALwBhAHAAbABlAGIAegB1ADQANwB3AGcAYQB6AGEAcABkAHEAawBzADYAdgByAGMAdgA2AHoAYwBuAGoAcABwAGsAYgB4AGIAcgA2AHcAawBlAHQAZgA1ADYAbgBmADYAYQBxADIAbgBtAHkAbwB5AGQALgBvAG4AaQBvAG4ALwB7AFUASQBEAH0ADQAKAA0ACgAyACkAIABJAGYAIABUAE8AUgAgAGIAbABvAGMAawBlAGQAIABpAG4AIAB5AG8AdQByACAAYwBvAHUAbgB0AHIAeQAsACAAdAByAHkAIAB0AG8AIAB1AHMAZQAgAFYAUABOACEAIABCAHUAdAAgAHkAbwB1ACAAYwBhAG4AIAB1AHMAZQAgAG8AdQByACAAcwBlAGMAbwBuAGQAYQByAHkAIAB3AGUAYgBzAGkAdABlAC4AIABGAG8AcgAgAHQAaABpAHMAOgANAAoAIAAgAGEAKQAgAE8AcABlAG4AIAB5AG8AdQByACAAYQBuAHkAIABiAHIAbwB3AHMAZQByACAAKABDAGgAcgBvAG0AZQAsACAARgBpAHIAZQBmAG8AeAAsACAATwBwAGUAcgBhACwAIABJAEUALAAgAEUAZABnAGUAKQANAAoAIAAgAGIAKQAgAE8AcABlAG4AIABvAHUAcgAgAHMAZQBjAG8AbgBkAGEAcgB5ACAAdwBlAGIAcwBpAHQAZQA6ACAAaAB0AHQAcAA6AC8ALwBkAGUAYwByAHkAcAB0AG8AcgAuAHQAbwBwAC8AewBVAEkARAB9AA0ACgANAAoAVwBhAHIAbgBpAG4AZwA6ACAAcwBlAGMAbwBuAGQAYQByAHkAIAB3AGUAYgBzAGkAdABlACAAYwBhAG4AIABiAGUAIABiAGwAbwBjAGsAZQBkACwAIAB0AGgAYQB0AHMAIAB3AGgAeQAgAGYAaQByAHMAdAAgAHYAYQByAGkAYQBuAHQAIABtAHUAYwBoACAAYgBlAHQAdABlAHIAIABhAG4AZAAgAG0AbwByAGUAIABhAHYAYQBpAGwAYQBiAGwAZQAuAA0ACgANAAoAVwBoAGUAbgAgAHkAbwB1ACAAbwBwAGUAbgAgAG8AdQByACAAdwBlAGIAcwBpAHQAZQAsACAAcAB1AHQAIAB0AGgAZQAgAGYAbwBsAGwAbwB3AGkAbgBnACAAZABhAHQAYQAgAGkAbgAgAHQAaABlACAAaQBuAHAAdQB0ACAAZgBvAHIAbQA6AA0ACgBLAGUAeQA6AA0ACgANAAoAewBLAEUAWQB9AA0ACgANAAoADQAKAEUAeAB0AGUAbgBzAGkAbwBuACAAbgBhAG0AZQA6AA0ACgANAAoAewBFAFgAVAB9AA0ACgANAAoALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAA0ACgANAAoAIQAhACEAIABEAEEATgBHAEUAUgAgACEAIQAhAA0ACgBEAE8ATgBUACAAdAByAHkAIAB0AG8AIABjAGgAYQBuAGcAZQAgAGYAaQBsAGUAcwAgAGIAeQAgAHkAbwB1AHIAcwBlAGwAZgAsACAARABPAE4AVAAgAHUAcwBlACAAYQBuAHkAIAB0AGgAaQByAGQAIABwAGEAcgB0AHkAIABzAG8AZgB0AHcAYQByAGUAIABmAG8AcgAgAHIAZQBzAHQAbwByAGkAbgBnACAAeQBvAHUAcgAgAGQAYQB0AGEAIABvAHIAIABhAG4AdABpAHYAaQByAHUAcwAgAHMAbwBsAHUAdABpAG8AbgBzACAALQAgAGkAdABzACAAbQBhAHkAIABlAG4AdABhAGkAbAAgAGQAYQBtAGcAZQAgAG8AZgAgAHQAaABlACAAcAByAGkAdgBhAHQAZQAgAGsAZQB5ACAAYQBuAGQALAAgAGEAcwAgAHIAZQBzAHUAbAB0ACwAIABUAGgAZQAgAEwAbwBzAHMAIABhAGwAbAAgAGQAYQB0AGEALgANAAoAIQAhACEAIAAhACEAIQAgACEAIQAhAA0ACgBPAE4ARQAgAE0ATwBSAEUAIABUAEkATQBFADoAIABJAHQAcwAgAGkAbgAgAHkAbwB1AHIAIABpAG4AdABlAHIAZQBzAHQAcwAgAHQAbwAgAGcAZQB0ACAAeQBvAHUAcgAgAGYAaQBsAGUAcwAgAGIAYQBjAGsALgAgAEYAcgBvAG0AIABvAHUAcgAgAHMAaQBkAGUALAAgAHcAZQAgACgAdABoAGUAIABiAGUAcwB0ACAAcwBwAGUAYwBpAGEAbABpAHMAdABzACkAIABtAGEAawBlACAAZQB2AGUAcgB5AHQAaABpAG4AZwAgAGYAbwByACAAcgBlAHMAdABvAHIAaQBuAGcALAAgAGIAdQB0ACAAcABsAGUAYQBzAGUAIABzAGgAbwB1AGwAZAAgAG4AbwB0ACAAaQBuAHQAZQByAGYAZQByAGUALgANAAoAIQAhACEAIAAhACEAIQAgACEAIQAhAAAA",\n   "nname":"{EXT}-readme.txt",\n   "exp":false,\n   "img":"QQBsAGwAIABvAGYAIAB5AG8AdQByACAAZgBpAGwAZQBzACAAYQByAGUAIABlAG4AYwByAHkAcAB0AGUAZAAhAA0ACgANAAoARgBpAG4AZAAgAHsARQBYAFQAfQAtAHIAZQBhAGQAbQBlAC4AdAB4AHQAIABhAG4AZAAgAGYAbwBsAGwAbwB3ACAAaQBuAHMAdAB1AGMAdABpAG8AbgBzAAAA",\n   "arn":false\n}\n'})}),"\n",(0,a.jsxs)(A.p,{children:["What are the contents of ",(0,a.jsx)(A.code,{children:"nbody"})," and ",(0,a.jsx)(A.code,{children:"img"}),"? Thats simple:"]}),"\n",(0,a.jsx)(A.h2,{id:"nbody",children:"nbody"}),"\n",(0,a.jsx)(A.pre,{children:(0,a.jsx)(A.code,{children:"---=== Welcome. Again. ===---\n\n[+] Whats Happen? [+]\n\nYour files are encrypted, and currently unavailable. You can check it: all files on your system has extension {EXT}.\n\nBy the way, everything is possible to recover (restore), but you need to follow our instructions. Otherwise, you cant return your data (NEVER).\n\n[+] What guarantees? [+]\n\nIts just a business. We absolutely do not care about you and your deals, except getting benefits. If we do not do our work and liabilities - nobody will not cooperate with us. Its not in our interests.\n\nTo check the ability of returning files, You should go to our website. There you can decrypt one file for free. That is our guarantee.\n\nIf you will not cooperate with our service - for us, its does not matter. But you will lose your time and data, cause just we have the private key. In practise - time is much more valuable than money.\n\n[+] How to get access on website? [+]\n\nYou have two ways:\n\n1) [Recommended] Using a TOR browser!\n\na) Download and install TOR browser from this site: https://torproject.org/\n\nb) Open our website: http://aplebzu47wgazapdqks6vrcv6zcnjppkbxbr6wketf56nf6aq2nmyoyd.onion/{UID}\n\n2) If TOR blocked in your country, try to use VPN! But you can use our secondary website. For this:\n\na) Open your any browser (Chrome, Firefox, Opera, IE, Edge)\n\nb) Open our secondary website: http://decryptor.top/{UID}\n\nWarning: secondary website can be blocked, thats why first variant much better and more available.\n\nWhen you open our website, put the following data in the input form:\n\nKey:\n\n{KEY}\n\nExtension name:\n\n{EXT}\n\n-----------------------------------------------------------------------------------------\n\n!!! DANGER !!!\n\nDONT try to change files by yourself, DONT use any third party software for restoring your data or antivirus solutions - its may entail damge of the private key and, as result, The Loss all data.\n\n!!! !!! !!!\n\nONE MORE TIME: Its in your interests to get your files back. From our side, we (the best specialists) make everything for restoring, but please should not interfere.\n\n!!! !!! !!!\n"})}),"\n",(0,a.jsx)(A.h2,{id:"img",children:"img"}),"\n",(0,a.jsx)(A.pre,{children:(0,a.jsx)(A.code,{children:"All of your files are encrypted!\n\nFind {EXT}-readme.txt and follow instuctions\n"})}),"\n",(0,a.jsx)(A.h2,{id:"bad-crypto",children:"Bad crypto"}),"\n",(0,a.jsx)(A.p,{children:"In my eyes, the interesting part of the section is the following entry:"}),"\n",(0,a.jsx)(A.pre,{children:(0,a.jsx)(A.code,{className:"language-json",children:'"pk":"3sB5vqBW0kuO3Nr56Ql+TMjaDchoEjxcKxBA/XbSJks="\n'})}),"\n",(0,a.jsxs)(A.p,{children:["The value of this entry (which is 256 bits large) is decoded and stored as a global static variable at ",(0,a.jsx)(A.code,{children:"0x00??DBA0"})," (the address may be different on your system at the position that I marked with ??). Unfortunately, I was not able to spot further read or write accesses to this address, but I'm working on it."]}),"\n",(0,a.jsx)(A.h1,{id:"other-traces",children:"Other traces"}),"\n",(0,a.jsx)(A.h2,{id:"file-size",children:"File size"}),"\n",(0,a.jsx)(A.p,{children:"All encrypted files have the same size as their unencrypted pendants. This means:"}),"\n",(0,a.jsxs)(A.ul,{children:["\n",(0,a.jsx)(A.li,{children:"some kind of stream cipher is being used, such as AES-CTR or AES-GCM"}),"\n",(0,a.jsx)(A.li,{children:"there are no meta information stored in the files"}),"\n"]}),"\n",(0,a.jsx)(A.h2,{id:"domains",children:"Domains"}),"\n",(0,a.jsx)(A.p,{children:"The entry dmn contains a list of domains, which may be compromised and may be used to spread malware. So I filed a claim and sent the full list to the police. Let's see if they can inform all potential victim. However, you should for now at least log accesses to the mentioned sites."})]})}function l(e={}){const{wrapper:A}={...(0,n.R)(),...e.components};return A?(0,a.jsx)(A,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},8453:(e,A,o)=>{o.d(A,{R:()=>i,x:()=>r});var a=o(6540);const n={},c=a.createContext(n);function i(e){const A=a.useContext(c);return a.useMemo((function(){return"function"==typeof e?e(A):{...A,...e}}),[A,e])}function r(e){let A;return A=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(c.Provider,{value:A},e.children)}}}]);