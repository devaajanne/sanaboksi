-- Original data from Kotus (CC BY 4.0): https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/nykysuomen-sana-aineistot/nykysuomen-sanalista/
-- Modified to fit this project's needs:
--      1) removed all words with fewer or more than 5 letters
--      2) removed words with diacritics (i.e. é, è, š)    
--      3) removed words ending in or including '-' (i.e. sika-)
--      4) removed derogatory words
--      5) removed words with a space in between (i.e. "au pair")

DELETE FROM finnish_words WHERE LENGTH(word) = 5;

-- Words starting with A
INSERT INTO finnish_words(word) VALUES
('aaloe'), ('aalto'), ('aamen'), ('aaria'), ('aarre'), ('aatos'), ('aatra'), ('aatto'), ('ahava'), ('ahdas'),
('ahdin'), ('ahkio'), ('ahmia'), ('ahnas'), ('ahtaa'), ('ahven'), ('aidas'), ('aihio'), ('aijai'), ('aikoa'),
('aines'), ('ainoa'), ('ainut'), ('aioli'), ('airut'), ('aisti'), ('aitio'), ('aitoa'), ('aitta'), ('aivan'),
('aivot'), ('ajaja'), ('ajelu'), ('ajuri'), ('akana'), ('aktio'), ('alati'), ('alava'), ('aleta'), ('alias'),
('alibi'), ('alien'), ('alkaa'), ('alkio'), ('allas'), ('aloke'), ('alppi'), ('altis'), ('altto'), ('aluke'),
('aluna'), ('ambra'), ('ameba'), ('ammis'), ('ammua'), ('ammus'), ('ammuu'), ('ampua'), ('anime'), ('ankea'),
('ankka'), ('annos'), ('anodi'), ('anoja'), ('ansas'), ('ansio'), ('antaa'), ('apaja'), ('apeus'), ('apila'),
('apina'), ('apnea'), ('appaa'), ('appsi'), ('apsis'), ('apuri'), ('arabi'), ('arava'), ('argon'), ('arina'),
('arkki'), ('arkku'), ('armas'), ('aromi'), ('arpoa'), ('arvio'), ('asana'), ('asema'), ('asemo'), ('asete'),
('askar'), ('askel'), ('astia'), ('astin'), ('astma'), ('astua'), ('asuja'), ('asuma'), ('atari'), ('atlas'),
('atomi'), ('audio'), ('aueta'), ('aukea'), ('aukio'), ('aukko'), ('aukoa'), ('aulio'), ('aulis'), ('aunus'),
('aussi'), ('autio'), ('avain'), ('avara'), ('avata'), ('avaus'), ('avoin'), ('azeri');

-- Words starting with B
INSERT INTO finnish_words(word) VALUES
('baana'), ('baari'), ('bagel'), ('balsa'), ('bambu'), ('banjo'), ('bantu'), ('barbi'), ('bardi'), ('baski'),
('basso'), ('baudi'), ('bebee'), ('bebop'), ('beesi'), ('beeta'), ('beibi'), ('beige'), ('bensa'), ('bidee'),
('biisi'), ('bilsa'), ('bimbo'), ('bingo'), ('biomi'), ('bisse'), ('bitti'), ('blini'), ('blogi'), ('blues'),
('boksi'), ('bongo'), ('bonus'), ('booli'), ('boomi'), ('boori'), ('botti'), ('bravo'), ('bromi'), ('bukee'),
('bulla'), ('burka'), ('bussi'), ('buumi'), ('buuri'), ('bygga'), ('bändi'), ('bänet'), ('bänks'), ('bänät'),
('börek');

-- Words starting with C
INSERT INTO finnish_words(word) VALUES
('cameo'), ('chili'), ('chips'), ('civis'), ('cover'), ('crack'), ('crema'), ('curry');

-- Words starting with D
INSERT INTO finnish_words(word) VALUES
('daami'), ('dandy'), ('darra'), ('darts'), ('debet'), ('dedis'), ('deeku'), ('dekki'), ('delta'), ('depis'),
('derby'), ('diili'), ('diiva'), ('dildo'), ('diodi'), ('dippi'), ('disko'), ('dogmi'), ('donna'), ('dorka'),
('doula'), ('drone'), ('durra'), ('duuma'), ('duuni'), ('duuri'), ('dyyni');

-- Words starting with E
INSERT INTO finnish_words(word) VALUES
('eagle'), ('ebola'), ('edetä'), ('eeden'), ('eepos'), ('eesti'), ('eetos'), ('eheys'), ('ehkei'), ('ehken'),
('ehtiä'), ('ehtoo'), ('ehtyä'), ('eilen'), ('eines'), ('eksyä'), ('ellei'), ('eloon'), ('elpyä'), ('eläin'),
('eläjä'), ('eläke'), ('elämä'), ('elävä'), ('emali'), ('emoji'), ('empiä'), ('enetä'), ('enkka'), ('ennen'),
('ensin'), ('entäs'), ('entää'), ('enään'), ('epeli'), ('epäys'), ('erite'), ('eritä'), ('eroon'), ('erota'),
('esiin'), ('esine'), ('esite'), ('essee'), ('estin'), ('estyä'), ('estää'), ('etana'), ('eteen'), ('etelä'),
('etevä'), ('etkot'), ('etova'), ('etsin'), ('etsiä'), ('ettei'), ('etuus'), ('etydi'), ('etänä'), ('eukko'),
('evätä');

-- Words starting with F
INSERT INTO finnish_words(word) VALUES
('faasi'), ('faija'), ('fakki'), ('faksi'), ('fakta'), ('farao'), ('farmi'), ('farsi'), ('fatsi'), ('fatwa'),
('fauna'), ('fauni'), ('fetsi'), ('fiini'), ('fikka'), ('fiksu'), ('filee'), ('filmi'), ('finis'), ('finni'),
('firma'), ('fleda'), ('fobia'), ('fokka'), ('foksi'), ('fokus'), ('folio'), ('fondi'), ('formu'), ('forte'),
('fudge'), ('fudia'), ('fudis'), ('fudut'), ('fuksi'), ('fusku'), ('futia'), ('futis'), ('futon'), ('fuuga'),
('fyffe'), ('fylli'), ('fääri'), ('fööni');

-- Words starting with G
INSERT INTO finnish_words(word) VALUES
('gaala'), ('gabro'), ('gaeli'), ('gamma'), ('gasti'), ('geeli'), ('geeni'), ('gekko'), ('genre'), ('gesso'),
('getto'), ('gimma'), ('glögi'), ('gongi'), ('gooni'), ('gouda'), ('gradu'), ('grape'), ('grogi'), ('guano'),
('guava'), ('gumbo'), ('gängi');

-- Words starting with H
INSERT INTO finnish_words(word) VALUES
('haamu'), ('haapa'), ('haara'), ('haava'), ('haave'), ('haavi'), ('hahlo'), ('hahmo'), ('haiku'), ('haili'),
('haima'), ('haisu'), ('haite'), ('hakea'), ('hakku'), ('hakoa'), ('halal'), ('halia'), ('halju'), ('halki'),
('halko'), ('halla'), ('halli'), ('halma'), ('halme'), ('haloo'), ('halpa'), ('halva'), ('handu'), ('hanhi'),
('hanka'), ('hanke'), ('hanki'), ('hanko'), ('hansa'), ('hanti'), ('haota'), ('hapan'), ('happi'), ('happo'),
('hapro'), ('hapsi'), ('hapsu'), ('harha'), ('harja'), ('harju'), ('harme'), ('harmi'), ('haroa'), ('harri'),
('harso'), ('harsu'), ('harus'), ('harva'), ('hasis'), ('hassi'), ('hassu'), ('hattu'), ('haude'), ('hauis'),
('hauki'), ('hauli'), ('haura'), ('hauta'), ('hauva'), ('havas'), ('heavy'), ('heebo'), ('hefta'), ('hehku'),
('hehto'), ('heila'), ('heili'), ('heimo'), ('heinä'), ('heisi'), ('heite'), ('heleä'), ('helke'), ('hella'),
('helle'), ('hellä'), ('helma'), ('helmi'), ('helpi'), ('helve'), ('hemmo'), ('henki'), ('henna'), ('henry'),
('hento'), ('heppa'), ('heppi'), ('heppu'), ('hereä'), ('herja'), ('hermo'), ('herne'), ('herra'), ('herua'),
('hetiö'), ('hetki'), ('hevin'), ('hidas'), ('hieho'), ('hieno'), ('hiesu'), ('hieta'), ('hihna'), ('hiili'),
('hiiop'), ('hiiri'), ('hiisi'), ('hiiva'), ('hijab'), ('hikka'), ('hikke'), ('hilla'), ('hillo'), ('hilse'),
('hilut'), ('hindi'), ('hindu'), ('hinku'), ('hinta'), ('hioke'), ('hiomo'), ('hiota'), ('hipat'), ('hipiä'),
('hipoa'), ('hippa'), ('hippi'), ('hippu'), ('hirmu'), ('hirsi'), ('hirvi'), ('hissa'), ('hissi'), ('hitsi'),
('hitti'), ('hitto'), ('hiuka'), ('hiven'), ('hobby'), ('hohde'), ('hohka'), ('hohoi'), ('hohto'), ('hoide'),
('hoito'), ('hoiva'), ('hokea'), ('hokki'), ('holli'), ('holvi'), ('homma'), ('honka'), ('hoopo'), ('hopea'),
('hoppu'), ('hormi'), ('horna'), ('horre'), ('hosua'), ('houre'), ('house'), ('huhta'), ('huhuu'), ('huili'),
('huilu'), ('huima'), ('huisi'), ('huivi'), ('hukka'), ('hullu'), ('humma'), ('humus'), ('hunni'), ('huntu'),
('huoku'), ('huoli'), ('huone'), ('huono'), ('huopa'), ('huora'), ('huovi'), ('huppu'), ('hupsu'), ('hurja'),
('hurma'), ('hurme'), ('hurri'), ('hutsu'), ('huttu'), ('huuli'), ('huuma'), ('huume'), ('huuri'), ('huuru'),
('huusi'), ('huuti'), ('huuto'), ('huuva'), ('hyhmä'), ('hylje'), ('hylky'), ('hylly'), ('hylsy'), ('hymen'),
('hymiö'), ('hymni'), ('hyppy'), ('hyrrä'), ('hytti'), ('hyvin'), ('hyvis'), ('hyyde'), ('hyytö'), ('hyöky'),
('hyöty'), ('hyötö'), ('häijy'), ('häive'), ('häivä'), ('häkki'), ('häntä'), ('häpeä'), ('häppä'), ('härkä'),
('härme'), ('härmä'), ('häviö'), ('häätö'), ('häävi'), ('hääyö'), ('höhlä'), ('höllä'), ('hölmö'), ('hönkä'),
('höpsö'), ('höpön'), ('hörhö'), ('höskä'), ('höttö'), ('höyde'), ('höyli'), ('höylä'), ('höynä'), ('höyry'),
('höyty');

-- Words starting with I
INSERT INTO finnish_words(word) VALUES
('idoli'), ('ihana'), ('iibis'), ('iikka'), ('iiris'), ('ikinä'), ('ikoni'), ('ikänä'), ('ikävä'), ('ikäys'),
('ikään'), ('ilkeä'), ('ilkiö'), ('ilman'), ('ilmiö'), ('iltti'), ('ilves'), ('image'), ('imago'), ('imelä'),
('immyt'), ('impro'), ('imuke'), ('imuri'), ('inaus'), ('ineen'), ('infra'), ('ininä'), ('input'), ('inssi'),
('intos'), ('intro'), ('intti'), ('ipana'), ('irkki'), ('irkku'), ('irviä'), ('iskeä'), ('iskos'), ('islam'),
('isota'), ('isous'), ('istua'), ('isyys'), ('itara'), ('itkeä'), ('ivata'), ('iäksi'), ('iäkäs'), ('iätön');

-- Words starting with J
INSERT INTO finnish_words(word) VALUES
('jaaha'), ('jaala'), ('jahka'), ('jahti'), ('jakaa'), ('jakki'), ('jakku'), ('jakso'), ('jalan'), ('jalas'),
('jalka'), ('jalus'), ('jambi'), ('jamit'), ('jannu'), ('jaoke'), ('japsi'), ('jarru'), ('jatke'), ('jatko'),
('jatsi'), ('jauhe'), ('jauho'), ('jeera'), ('jekku'), ('jemma'), ('jengi'), ('jenka'), ('jeppe'), ('jermu'),
('jetti'), ('jiddi'), ('jihad'), ('jiiri'), ('jipii'), ('jippo'), ('johde'), ('johto'), ('joiku'), ('jokin'),
('jolla'), ('jolma'), ('jonne'), ('jooga'), ('joogi'), ('jooli'), ('jorma'), ('josko'), ('jospa'), ('joten'),
('jotos'), ('jotta'), ('jouhi'), ('joule'), ('joulu'), ('jousi'), ('juhla'), ('juhta'), ('jukka'), ('jukra'),
('julki'), ('julli'), ('julma'), ('jumbo'), ('junnu'), ('juoda'), ('juoma'), ('juomu'), ('juoni'), ('juopa'),
('juoru'), ('juote'), ('juova'), ('jupik'), ('juppi'), ('juroa'), ('jurri'), ('jussi'), ('jutaa'), ('juttu'),
('juuri'), ('jylhä'), ('jyske'), ('jytke'), ('jytky'), ('jytää'), ('jäkki'), ('jälki'), ('jälsi'), ('jänis'),
('jänkä'), ('jänne'), ('jännä'), ('järeä'), ('järin'), ('järki'), ('järvi'), ('jäsen'), ('jätkä'), ('jätti'),
('jättö'), ('jätös'), ('jäyhä'), ('jäynä'), ('jäädä'), ('jäähy'), ('jäämä'), ('jäärä'), ('jäävi'), ('jööti');

-- Words starting with K
INSERT INTO finnish_words(word) VALUES
('kaade'), ('kaali'), ('kaaos'), ('kaapu'), ('kaara'), ('kaari'), ('kaaso'), ('kaasu'), ('kaato'), ('kaava'),
('kahjo'), ('kahju'), ('kahle'), ('kahta'), ('kahva'), ('kahvi'), ('kaide'), ('kaihi'), ('kaiho'), ('kaiku'),
('kaima'), ('kaino'), ('kaira'), ('kaita'), ('kaivo'), ('kaivu'), ('kajal'), ('kakka'), ('kakko'), ('kakku'),
('kakoa'), ('kakru'), ('kaksi'), ('kalhu'), ('kalja'), ('kalju'), ('kalke'), ('kalla'), ('kalle'), ('kallo'),
('kalma'), ('kalmo'), ('kalpa'), ('kalsa'), ('kalvo'), ('kamee'), ('kammo'), ('kampa'), ('kampe'), ('kampi'),
('kandi'), ('kanki'), ('kanna'), ('kanne'), ('kannu'), ('kansa'), ('kansi'), ('kanta'), ('kanto'), ('kapea'),
('kappa'), ('kappi'), ('kapse'), ('kaput'), ('karhe'), ('karhi'), ('karho'), ('karhu'), ('karja'), ('karju'),
('karku'), ('karma'), ('karmi'), ('karri'), ('karsi'), ('karva'), ('karve'), ('kaski'), ('kasko'), ('kasku'),
('kassa'), ('kassi'), ('kaste'), ('kasti'), ('kasvi'), ('kasvo'), ('kasvu'), ('katka'), ('katki'), ('katko'),
('katku'), ('katos'), ('katse'), ('katti'), ('katto'), ('katua'), ('katve'), ('kauaa'), ('kauan'), ('kauas'),
('kauha'), ('kauhu'), ('kauin'), ('kaula'), ('kauna'), ('kauno'), ('kaura'), ('kausi'), ('kavio'), ('kebab'),
('kehiä'), ('kehno'), ('kehnä'), ('kehrä'), ('kehto'), ('kehua'), ('kehys'), ('keija'), ('keiju'), ('keila'),
('keino'), ('keinu'), ('keisi'), ('keiso'), ('kekri'), ('keksi'), ('kelja'), ('kelju'), ('kello'), ('kelmi'),
('kelmu'), ('kelpo'), ('kelta'), ('kemia'), ('kemut'), ('kendo'), ('kenkä'), ('kenno'), ('keota'), ('kepeä'),
('keppi'), ('kerho'), ('keriä'), ('kerma'), ('kermi'), ('kerni'), ('kersa'), ('kerta'), ('kerto'), ('keruu'),
('kesiä'), ('kessu'), ('kesti'), ('kesto'), ('ketju'), ('ketku'), ('ketsi'), ('ketto'), ('kettu'), ('keula'),
('keveä'), ('kevyt'), ('kevät'), ('khaki'), ('khmer'), ('kieli'), ('kielo'), ('kiero'), ('kierä'), ('kihti'),
('kiila'), ('kiilu'), ('kiima'), ('kiina'), ('kiire'), ('kiiri'), ('kiiru'), ('kiisu'), ('kiito'), ('kiivi'),
('kikka'), ('kilju'), ('kilke'), ('kilpa'), ('kilpi'), ('kilsa'), ('kilta'), ('kimeä'), ('kimma'), ('kimpi'),
('kingi'), ('kinoa'), ('kinos'), ('kinua'), ('kipeä'), ('kippi'), ('kippo'), ('kipsa'), ('kipsi'), ('kireä'),
('kiriä'), ('kirja'), ('kirje'), ('kirjo'), ('kirnu'), ('kirsi'), ('kirsu'), ('kirva'), ('kiska'), ('kisko'),
('kissa'), ('kitka'), ('kitku'), ('kitsi'), ('kitti'), ('kitua'), ('kiuas'), ('kiulu'), ('kiuru'), ('kiusa'),
('kives'), ('klani'), ('klapi'), ('klubi'), ('koala'), ('kobra'), ('kofta'), ('kohde'), ('kohta'), ('kohti'),
('kohtu'), ('kohva'), ('koipi'), ('koira'), ('koisa'), ('koiso'), ('koite'), ('koivu'), ('kokea'), ('kokis'),
('kokka'), ('kokki'), ('kokko'), ('koksi'), ('kolea'), ('kolho'), ('kolhu'), ('kolja'), ('kolke'), ('kolli'),
('kollo'), ('kolme'), ('koloa'), ('kolvi'), ('kombo'), ('komea'), ('kompa'), ('konki'), ('konna'), ('konsa'),
('kontu'), ('koodi'), ('kooma'), ('koota'), ('kopea'), ('kopio'), ('kopla'), ('koppa'), ('koppi'), ('kopra'),
('kopse'), ('kopsu'), ('kopti'), ('korea'), ('koris'), ('korko'), ('korma'), ('korni'), ('korpi'), ('korsi'),
('korsu'), ('korte'), ('korva'), ('korvo'), ('kosia'), ('koska'), ('koski'), ('kosla'), ('koste'), ('kosto'),
('kotia'), ('kotka'), ('kotoa'), ('kotsa'), ('kotus'), ('kotva'), ('kouho'), ('koulu'), ('koura'), ('kouru'),
('kovaa'), ('kovin'), ('kovis'), ('kraka'), ('krapu'), ('krimi'), ('kromi'), ('kränä'), ('kudin'), ('kudos'),
('kuhmu'), ('kuhun'), ('kuilu'), ('kuiri'), ('kuitu'), ('kuiva'), ('kukin'), ('kukka'), ('kukko'), ('kukku'),
('kuksa'), ('kulho'), ('kulju'), ('kulku'), ('kulli'), ('kulma'), ('kulta'), ('kulti'), ('kulua'), ('kumea'),
('kumma'), ('kummi'), ('kumpi'), ('kumpu'), ('kundi'), ('kunne'), ('kunpa'), ('kunta'), ('kunto'), ('kuoha'),
('kuohu'), ('kuola'), ('kuolo'), ('kuoma'), ('kuomu'), ('kuona'), ('kuono'), ('kuore'), ('kuori'), ('kuoro'),
('kuosi'), ('kuovi'), ('kupla'), ('kuppa'), ('kuppi'), ('kupro'), ('kupru'), ('kurdi'), ('kurho'), ('kurin'),
('kurja'), ('kurki'), ('kurko'), ('kuroa'), ('kurra'), ('kurre'), ('kurri'), ('kurva'), ('kurvi'), ('kuski'),
('kussa'), ('kusta'), ('kutea'), ('kuten'), ('kutka'), ('kutoa'), ('kutsu'), ('kuttu'), ('kuula'), ('kuulo'),
('kuulu'), ('kuuma'), ('kuume'), ('kuura'), ('kuuri'), ('kuuro'), ('kuusi'), ('kuvas'), ('kuvio'), ('kuvis'),
('kyetä'), ('kyhmy'), ('kylki'), ('kyllä'), ('kylmä'), ('kylpy'), ('kylvö'), ('kymri'), ('kyniä'), ('kynsi'),
('kynte'), ('kyntö'), ('kypsi'), ('kypsä'), ('kyrpä'), ('kyrsä'), ('kyssä'), ('kysta'), ('kystä'), ('kysyä'),
('kyteä'), ('kytis'), ('kytky'), ('kyttä'), ('kyylä'), ('kyyry'), ('kyyti'), ('kyömy'), ('käheä'), ('källi'),
('kämmi'), ('känni'), ('känny'), ('känsä'), ('käreä'), ('kärhi'), ('kärhö'), ('kärki'), ('kärri'), ('kärry'),
('kärsä'), ('käsin'), ('käsis'), ('käsky'), ('käsnä'), ('kässä'), ('kätkö'), ('kätsy'), ('kätsä'), ('käydä'),
('käypä'), ('käyrä'), ('käyte'), ('käyvä'), ('käämi'), ('kääpä'), ('kääre'), ('käärö'), ('kääty'), ('köhiä'),
('kökkö'), ('köksä'), ('kölli'), ('kössi'), ('köyhä'), ('köyry'), ('köysi'), ('köyte'), ('kööri');

-- Words starting with L
INSERT INTO finnish_words(word) VALUES
('laaja'), ('laaka'), ('laaki'), ('laama'), ('laari'), ('laata'), ('laatu'), ('laava'), ('laavu'), ('labra'),
('lados'), ('lafka'), ('lager'), ('lahja'), ('lahje'), ('lahko'), ('lahna'), ('lahti'), ('laiha'), ('laiho'),
('laina'), ('laine'), ('laita'), ('laite'), ('laiva'), ('lakea'), ('lakka'), ('lakki'), ('lakko'), ('lamee'),
('lampi'), ('lande'), ('lanit'), ('lanka'), ('lanko'), ('lanne'), ('lanta'), ('laota'), ('lapio'), ('lappi'),
('lappo'), ('lappu'), ('lapsi'), ('largo'), ('laser'), ('lasko'), ('lasku'), ('lassi'), ('lasso'), ('lasta'),
('lasti'), ('lastu'), ('latoa'), ('latta'), ('latte'), ('latva'), ('laude'), ('lauha'), ('laulu'), ('lauma'),
('lause'), ('lauta'), ('lavea'), ('leffa'), ('lehmä'), ('lehti'), ('lehto'), ('lehvä'), ('leidi'), ('leija'),
('leike'), ('leili'), ('leima'), ('leimu'), ('leini'), ('leipä'), ('leiri'), ('leivo'), ('lelli'), ('lempi'),
('lempo'), ('lenko'), ('lento'), ('leppä'), ('lepra'), ('lepsu'), ('lesbo'), ('leski'), ('lesti'), ('lesty'),
('lestä'), ('letka'), ('letku'), ('letti'), ('letto'), ('lettu'), ('leuka'), ('leuku'), ('leuto'), ('leveä'),
('liata'), ('lieju'), ('lieka'), ('lieko'), ('liemi'), ('lieri'), ('liero'), ('liesi'), ('liesu'), ('liete'),
('lieve'), ('lievä'), ('lifti'), ('lihas'), ('lihis'), ('lihoa'), ('liian'), ('liiga'), ('liika'), ('liike'),
('liila'), ('liima'), ('liina'), ('liira'), ('liite'), ('liito'), ('liitu'), ('liivi'), ('likin'), ('likka'),
('liksa'), ('lilja'), ('limbo'), ('limsa'), ('linja'), ('linko'), ('linna'), ('linni'), ('lintu'), ('liota'),
('lipas'), ('lipeä'), ('lipoa'), ('lippa'), ('lippi'), ('lippo'), ('lippu'), ('lipua'), ('liriä'), ('lirua'),
('lisko'), ('lista'), ('lisää'), ('litka'), ('litku'), ('litra'), ('litsa'), ('litsi'), ('liuku'), ('liuos'),
('liuta'), ('livvi'), ('loata'), ('lobby'), ('loden'), ('lodju'), ('lohko'), ('lohtu'), ('loimi'), ('loimu'),
('loiva'), ('lojua'), ('lokki'), ('lokse'), ('lommo'), ('lonka'), ('loosi'), ('loota'), ('lopen'), ('loppu'),
('lordi'), ('loska'), ('lossi'), ('lotja'), ('lotta'), ('lotto'), ('louhe'), ('luhta'), ('luhti'), ('luihu'),
('luiku'), ('luiru'), ('luisu'), ('lujaa'), ('lukea'), ('lukio'), ('lukki'), ('lukko'), ('luksi'), ('lulla'),
('lumen'), ('lumme'), ('lunki'), ('lunni'), ('luoda'), ('luode'), ('luoja'), ('luoko'), ('luola'), ('luoma'),
('luomi'), ('luomu'), ('luona'), ('luota'), ('luoti'), ('luoto'), ('luova'), ('luovi'), ('luppi'), ('luppo'),
('lusia'), ('lusmu'), ('luste'), ('lusto'), ('lutka'), ('luulo'), ('luumu'), ('luuri'), ('luuta'), ('lyhde'),
('lyhki'), ('lyhty'), ('lyhyt'), ('lyijy'), ('lykky'), ('lymfa'), ('lypsy'), ('lyseo'), ('lysti'), ('lyydi'),
('lyyli'), ('lyyra'), ('lyödä'), ('lyöjä'), ('lähde'), ('lähes'), ('lähin'), ('lähiö'), ('lähtö'), ('läike'),
('läkki'), ('läksy'), ('lälly'), ('lämpö'), ('länsi'), ('läppä'), ('läpse'), ('lärvi'), ('läsiä'), ('läski'),
('läsnä'), ('lässy'), ('lätkä'), ('lätsä'), ('lätti'), ('lätty'), ('lääke'), ('lääni'), ('lääte'), ('läävä'),
('löllö'), ('lössi'), ('lötkö'), ('löyhä'), ('löyly'), ('löysä'), ('löytö');

-- Words starting with M
INSERT INTO finnish_words(word) VALUES
('maagi'), ('maali'), ('maamo'), ('maaru'), ('maata'), ('maate'), ('macho'), ('mafia'), ('magia'), ('magma'),
('magna'), ('mahis'), ('mahku'), ('mahla'), ('mahti'), ('maija'), ('maila'), ('maili'), ('maine'), ('maiti'),
('maito'), ('makea'), ('makki'), ('makro'), ('maksa'), ('maksi'), ('maksu'), ('makuu'), ('malja'), ('malka'),
('malli'), ('malmi'), ('malto'), ('malva'), ('mamba'), ('mambo'), ('mamis'), ('mamma'), ('manga'), ('mango'),
('mania'), ('manna'), ('mansi'), ('manto'), ('mantu'), ('maori'), ('mappi'), ('marja'), ('marsu'), ('marto'),
('masai'), ('maski'), ('massa'), ('massi'), ('massu'), ('masto'), ('mataa'), ('matka'), ('matsi'), ('matta'),
('matti'), ('matto'), ('mauri'), ('media'), ('meemi'), ('meikä'), ('meili'), ('mekka'), ('mekko'), ('melko'),
('meloa'), ('melto'), ('mennä'), ('menyy'), ('meppi'), ('merta'), ('mesoa'), ('messi'), ('messu'), ('mesta'),
('metka'), ('metku'), ('metri'), ('metro'), ('metso'), ('metsä'), ('mieli'), ('miero'), ('miete'), ('mieto'),
('mihin'), ('miilu'), ('miimi'), ('miina'), ('mikin'), ('mikki'), ('mikro'), ('miksi'), ('milli'), ('mimmi'),
('miniä'), ('minne'), ('minsa'), ('mirha'), ('mirin'), ('mirri'), ('missi'), ('missä'), ('mistä'), ('miten'),
('mitra'), ('mitta'), ('modus'), ('moike'), ('moite'), ('mokka'), ('molli'), ('molva'), ('mones'), ('monni'),
('monta'), ('moodi'), ('mooli'), ('moppi'), ('mopsi'), ('moron'), ('mosel'), ('moska'), ('motti'), ('motto'),
('mufti'), ('muhea'), ('muhia'), ('muhvi'), ('muija'), ('mukaa'), ('muksu'), ('mulli'), ('multa'), ('mummi'),
('mummo'), ('mummu'), ('mungo'), ('munia'), ('muona'), ('muori'), ('muoti'), ('muoto'), ('muovi'), ('murea'),
('muren'), ('murha'), ('murhe'), ('murju'), ('murre'), ('mursu'), ('murto'), ('museo'), ('mussu'), ('musta'),
('muste'), ('mutka'), ('mutsi'), ('mutta'), ('muuan'), ('muuli'), ('muuri'), ('muusa'), ('muusi'), ('myhky'),
('mykiö'), ('mykkä'), ('mylly'), ('myrha'), ('myski'), ('mysli'), ('myssy'), ('mytty'), ('myydä'), ('myyjä'),
('myyrä'), ('myyty'), ('myödä'), ('myöhä'), ('myötä'), ('mähkä'), ('mäihä'), ('mäike'), ('mälli'), ('mälsä'),
('mämmi'), ('mänty'), ('mäntä'), ('märkä'), ('mäsis'), ('mäski'), ('mäskä'), ('mässy'), ('mätiä'), ('mätky'),
('mättö'), ('mätäs'), ('mäyrä'), ('määre'), ('määrä'), ('mökki'), ('mölli'), ('mömmö'), ('mönjä'), ('möreä'),
('mörkö'), ('mössö'), ('mötti'), ('möyhy');

-- Words starting with N
INSERT INTO finnish_words(word) VALUES
('naali'), ('naama'), ('naara'), ('naava'), ('nacho'), ('nafta'), ('nafti'), ('nahas'), ('nahka'), ('naida'),
('naivi'), ('nakki'), ('naksu'), ('nalle'), ('nalli'), ('nanna'), ('nappa'), ('nappi'), ('nappo'), ('napsu'),
('narri'), ('nashi'), ('nasse'), ('nassu'), ('nasta'), ('natsa'), ('natsi'), ('nauha'), ('naula'), ('nauru'),
('nauta'), ('neiti'), ('neito'), ('nekku'), ('neliö'), ('neljä'), ('nelma'), ('neppi'), ('neste'), ('netti'),
('netto'), ('neula'), ('neule'), ('neuvo'), ('niche'), ('nidos'), ('nielu'), ('niemi'), ('nihti'), ('niini'),
('niisi'), ('niisk'), ('niksi'), ('nimiö'), ('ninja'), ('niobi'), ('nippa'), ('nippu'), ('nipsu'), ('niqab'),
('nirri'), ('nirso'), ('niska'), ('nisse'), ('nissi'), ('nisti'), ('nitoa'), ('nitro'), ('niuho'), ('nivel'),
('nivoa'), ('nivus'), ('noeta'), ('noita'), ('nokka'), ('nolla'), ('nopea'), ('noppa'), ('nopsa'), ('norja'),
('normi'), ('norri'), ('norsu'), ('norua'), ('noste'), ('nosto'), ('notko'), ('nousu'), ('nouto'), ('nugaa'),
('nuhde'), ('nuija'), ('nuiva'), ('nukka'), ('nukke'), ('nukki'), ('nulju'), ('nummi'), ('nunna'), ('nuoli'),
('nuolu'), ('nuora'), ('nuori'), ('nuppi'), ('nuppu'), ('nurea'), ('nurin'), ('nurja'), ('nurmi'), ('nuttu'),
('nuuka'), ('nykiä'), ('nyksä'), ('nykyä'), ('nylky'), ('nylon'), ('nymfi'), ('nynny'), ('nyppy'), ('nyreä'),
('nysty'), ('nyöri'), ('nähdä'), ('näkki'), ('näkyä'), ('nälkä'), ('nänni'), ('näppi'), ('näppy'), ('näpsä'),
('närhi'), ('näsiä'), ('nätti'), ('näyte'), ('näätä'), ('nössö'), ('nöyrä');

-- Words starting with O
INSERT INTO finnish_words(word) VALUES
('odote'), ('ohari'), ('oheen'), ('oheta'), ('ohhoh'), ('ohimo'), ('ohjas'), ('ohjus'), ('ohuus'), ('oieta'),
('oijoi'), ('oikea'), ('oikis'), ('oikku'), ('oikoa'), ('oinas'), ('oitis'), ('ojoon'), ('ojuke'), ('okapi'),
('oksia'), ('olake'), ('oleva'), ('olija'), ('omata'), ('omega'), ('omena'), ('ommel'), ('omppu'), ('onkia'),
('ontto'), ('ontua'), ('ookoo'), ('oppia'), ('optio'), ('orava'), ('origo'), ('orkka'), ('orkku'), ('osake'),
('osata'), ('ostaa'), ('ostos'), ('osuma'), ('osuus'), ('osuva'), ('otsis'), ('ottaa'), ('ovela');

-- Words starting with P
INSERT INTO finnish_words(word) VALUES
('paali'), ('paalu'), ('paanu'), ('paasi'), ('paavi'), ('padel'), ('paeta'), ('pahis'), ('pahka'), ('pahki'),
('pahna'), ('pahus'), ('pahvi'), ('paine'), ('paini'), ('paino'), ('paise'), ('paita'), ('pakka'), ('pakki'),
('pakko'), ('paksu'), ('pakti'), ('palaa'), ('palho'), ('palje'), ('paljo'), ('palju'), ('palko'), ('palle'),
('palli'), ('pallo'), ('palmu'), ('paloa'), ('palsa'), ('palte'), ('paluu'), ('palvi'), ('pampa'), ('panda'),
('panna'), ('pannu'), ('panos'), ('panta'), ('pappa'), ('pappi'), ('paras'), ('pareo'), ('paria'), ('parka'),
('parku'), ('parru'), ('parsa'), ('parsi'), ('parta'), ('party'), ('parvi'), ('pasha'), ('paska'), ('pasma'),
('paspa'), ('passi'), ('pasta'), ('patee'), ('patio'), ('patja'), ('patti'), ('pauhu'), ('pauke'), ('paula'),
('pauna'), ('pause'), ('peeaa'), ('peesi'), ('peffa'), ('pehko'), ('pehku'), ('pehmo'), ('pehva'), ('peili'),
('peite'), ('pekka'), ('pelko'), ('pelle'), ('pelti'), ('pelto'), ('peluu'), ('penis'), ('penne'), ('penni'),
('penny'), ('pensa'), ('pentu'), ('peoni'), ('peppu'), ('perhe'), ('perho'), ('perin'), ('periä'), ('perna'),
('perse'), ('perso'), ('persu'), ('perua'), ('perus'), ('pervo'), ('pesin'), ('pesis'), ('pesiä'), ('peski'),
('pesti'), ('pesto'), ('pestä'), ('pesue'), ('pesye'), ('petos'), ('petsi'), ('pettu'), ('peura'), ('piano'),
('pidin'), ('pidot'), ('pieli'), ('piena'), ('pieni'), ('pieru'), ('pieti'), ('pietä'), ('pihiä'), ('pihka'),
('pihta'), ('pihvi'), ('piika'), ('piilo'), ('piilu'), ('piimä'), ('piina'), ('piiri'), ('piiru'), ('piisi'),
('pikaa'), ('pikee'), ('pikku'), ('pilke'), ('pilli'), ('pillu'), ('pilvi'), ('pimeä'), ('pimiö'), ('pinja'),
('pinko'), ('pinna'), ('pinne'), ('pinni'), ('pinta'), ('pioni'), ('pirta'), ('pirtu'), ('pisiä'), ('piski'),
('pissa'), ('pissi'), ('piste'), ('pisto'), ('pitko'), ('pitkä'), ('pitsa'), ('pitsi'), ('pitää'), ('piuha'),
('pizza'), ('plari'), ('platy'), ('pliis'), ('pläsi'), ('plääh'), ('plörö'), ('pohja'), ('pohje'), ('poies'),
('poiju'), ('poika'), ('poimu'), ('pokka'), ('poksi'), ('polio'), ('polku'), ('polla'), ('polle'), ('polte'),
('polvi'), ('pommi'), ('pomsi'), ('pondi'), ('ponsi'), ('pooki'), ('pooli'), ('poolo'), ('poppa'), ('poppi'),
('porho'), ('porno'), ('poski'), ('posse'), ('possu'), ('posti'), ('potea'), ('potka'), ('potku'), ('potra'),
('potta'), ('potti'), ('pottu'), ('pouta'), ('priki'), ('proge'), ('proto'), ('provo'), ('psori'), ('ptruu'),
('pudas'), ('puffi'), ('puhde'), ('puhki'), ('puhti'), ('puhua'), ('puhvi'), ('puida'), ('puija'), ('puite'),
('pujoa'), ('pujos'), ('pukea'), ('pukki'), ('puklu'), ('pulja'), ('pulju'), ('pulla'), ('pullo'), ('pulma'),
('pulmu'), ('pummi'), ('punka'), ('punoa'), ('punos'), ('punta'), ('puola'), ('puoli'), ('puomi'), ('puosu'),
('puoti'), ('puppu'), ('purje'), ('purjo'), ('purku'), ('purra'), ('purse'), ('pursi'), ('purso'), ('pusia'),
('puska'), ('pusku'), ('pussi'), ('pusta'), ('putka'), ('putki'), ('putti'), ('putto'), ('puuha'), ('puuma'),
('puuro'), ('puute'), ('pygmi'), ('pykiä'), ('pylly'), ('pyree'), ('pyrky'), ('pyssy'), ('pysti'), ('pysty'),
('pystö'), ('pysyä'), ('pyton'), ('pytty'), ('pyyde'), ('pyyhe'), ('pyöry'), ('pyörä'), ('pyörö'), ('päheä'),
('päivä'), ('päkiä'), ('pälvi'), ('pännä'), ('pässi'), ('päteä'), ('pätkä'), ('pätsi'), ('pääri'), ('pääsy'),
('pääte'), ('pääty'), ('pöhkö'), ('pöhnä'), ('pökät'), ('pölhö'), ('pöljä'), ('pölli'), ('pölly'), ('pöllö'),
('pörrö'), ('pötky'), ('pötkö'), ('pötsi'), ('pöytä');

-- Words starting with Q
INSERT INTO finnish_words(word) VALUES
('quasi'), ('quorn');

-- Words starting with R
INSERT INTO finnish_words(word) VALUES
('raaja'), ('raaka'), ('raami'), ('raana'), ('raani'), ('raanu'), ('raape'), ('raasu'), ('raate'), ('raati'),
('raato'), ('rabbi'), ('radio'), ('radon'), ('radža'), ('rafla'), ('raguu'), ('rahje'), ('rahka'), ('rahna'),
('rahti'), ('rahtu'), ('raide'), ('railo'), ('raina'), ('raisu'), ('raita'), ('raito'), ('raivo'), ('rakas'),
('rakka'), ('rakki'), ('rakko'), ('raksa'), ('raksi'), ('raksu'), ('ralli'), ('rambo'), ('ramen'), ('rampa'),
('randi'), ('rangi'), ('ranka'), ('ranki'), ('ranko'), ('ranne'), ('ranta'), ('rantu'), ('rapea'), ('rappu'),
('rapse'), ('rapsi'), ('rapsu'), ('rasia'), ('raski'), ('rasko'), ('raspi'), ('rassi'), ('rassu'), ('rasta'),
('rasti'), ('rasva'), ('ratas'), ('ratki'), ('ratsu'), ('ratti'), ('ratto'), ('rauha'), ('rauta'), ('rautu'),
('ravet'), ('ravit'), ('reeti'), ('rehti'), ('reiki'), ('reikä'), ('reilu'), ('reima'), ('reisi'), ('reivi'),
('rekka'), ('rekki'), ('reksi'), ('remmi'), ('renki'), ('rento'), ('repiä'), ('reppu'), ('repro'), ('reput'),
('respa'), ('ressu'), ('reteä'), ('retki'), ('retku'), ('retro'), ('reuma'), ('reuna'), ('revyy'), ('ribbi'),
('rieha'), ('riemu'), ('riena'), ('riepu'), ('riesa'), ('rievä'), ('riffi'), ('rihla'), ('rihma'), ('riihi'),
('riimi'), ('riimu'), ('riisa'), ('riisi'), ('riita'), ('riite'), ('riiuu'), ('rikas'), ('rikka'), ('rikki'),
('rikko'), ('rikos'), ('riksa'), ('riksi'), ('rimpi'), ('rimsu'), ('rinki'), ('rinne'), ('rinta'), ('ripeä'),
('rippi'), ('rippu'), ('ripsi'), ('ripsu'), ('riski'), ('risoa'), ('risti'), ('ritsa'), ('ritva'), ('riuku'),
('riuna'), ('rodeo'), ('rohea'), ('rohjo'), ('rohmu'), ('rohto'), ('roihu'), ('roilo'), ('roima'), ('roina'),
('roipe'), ('roisi'), ('rokka'), ('rokki'), ('rokko'), ('rombi'), ('rommi'), ('rompe'), ('rondi'), ('rondo'),
('rooli'), ('roosa'), ('ropse'), ('rosee'), ('roska'), ('rosmo'), ('rosti'), ('rosvo'), ('rotko'), ('rotsi'),
('rotta'), ('rouhe'), ('routa'), ('rouva'), ('rovio'), ('rugby'), ('ruhje'), ('rukka'), ('rukki'), ('ruksi'),
('rulla'), ('rumba'), ('rumpu'), ('rundi'), ('runko'), ('ruode'), ('ruoho'), ('ruoja'), ('ruoka'), ('ruoko'),
('ruori'), ('ruoti'), ('ruoto'), ('ruotu'), ('rupia'), ('rupla'), ('ruska'), ('rusko'), ('rusto'), ('rutka'),
('rutto'), ('ruttu'), ('ruuhi'), ('ruuma'), ('ruuna'), ('ruusu'), ('ruuti'), ('ruutu'), ('ruuvi'), ('ryhmy'),
('ryhmä'), ('ryhti'), ('ryijy'), ('rykiä'), ('ryntö'), ('ryppy'), ('rypsi'), ('rypäs'), ('ryske'), ('rysty'),
('rytke'), ('rytky'), ('rytmi'), ('ryväs'), ('ryyni'), ('ryysy'), ('ryyti'), ('ryönä'), ('rähjä'), ('rähmä'),
('räike'), ('räime'), ('räkiä'), ('räkki'), ('räkkä'), ('räksä'), ('rämeä'), ('ränni'), ('räntä'), ('räppi'),
('räpse'), ('rästi'), ('rätti'), ('rääsy'), ('räävi'), ('röhnä'), ('rölli'), ('römeä'), ('rönsy'), ('rösti'),
('rötös'), ('röyhy'), ('rööki'), ('rööri');

-- Words starting with S
INSERT INTO finnish_words(word) VALUES
('saada'), ('saaga'), ('saago'), ('saaja'), ('saali'), ('saame'), ('saari'), ('saate'), ('saati'), ('saavi'),
('sabra'), ('sadas'), ('sadin'), ('saeta'), ('safka'), ('sahra'), ('sahti'), ('sahuu'), ('saita'), ('sakea'),
('sakka'), ('sakki'), ('sakko'), ('saksa'), ('salaa'), ('saldo'), ('salko'), ('salmi'), ('salon'), ('salpa'),
('salsa'), ('salva'), ('samba'), ('sambo'), ('samea'), ('sampi'), ('sampo'), ('samum'), ('sanka'), ('sanko'),
('sanoa'), ('santa'), ('sanue'), ('saota'), ('sappi'), ('sarja'), ('sarka'), ('sarvi'), ('sataa'), ('satay'),
('satsi'), ('saudi'), ('sauhu'), ('sauma'), ('sauna'), ('sauro'), ('sauva'), ('saves'), ('scifi'), ('sedan'),
('seili'), ('seimi'), ('seinä'), ('seipi'), ('seita'), ('seiti'), ('sekka'), ('sekki'), ('seksi'), ('sekti'),
('selin'), ('selja'), ('selko'), ('selkä'), ('selli'), ('sello'), ('sellu'), ('selus'), ('selvä'), ('selys'),
('seota'), ('seppo'), ('seppä'), ('serbi'), ('sermi'), ('serri'), ('servo'), ('setri'), ('setti'), ('seula'),
('seura'), ('seutu'), ('shiia'), ('sidos'), ('sielu'), ('sieni'), ('siera'), ('sieto'), ('sietä'), ('sievä'),
('sigma'), ('sihti'), ('siika'), ('siili'), ('siilo'), ('siima'), ('siinä'), ('siipi'), ('siira'), ('siitä'),
('siivo'), ('siivu'), ('sikeä'), ('sikhi'), ('sikiö'), ('sikli'), ('siksi'), ('silat'), ('sileä'), ('silko'),
('silla'), ('silli'), ('sillä'), ('silmu'), ('silmä'), ('silsa'), ('silta'), ('silti'), ('simmu'), ('sinko'),
('sinne'), ('sinut'), ('sioux'), ('sippi'), ('sipsi'), ('sirri'), ('sisal'), ('sisar'), ('sisin'), ('sisko'),
('sissi'), ('sisus'), ('sitar'), ('siten'), ('sitko'), ('sitoa'), ('sitra'), ('sitsi'), ('siveä'), ('skaba'),
('skeet'), ('skene'), ('skini'), ('skool'), ('slobo'), ('snadi'), ('snobi'), ('soeta'), ('softa'), ('sohia'),
('sohjo'), ('sohva'), ('soida'), ('soija'), ('soiro'), ('sokea'), ('sokka'), ('sokki'), ('sokko'), ('solki'),
('solmu'), ('solua'), ('sompa'), ('sondi'), ('sonni'), ('sonta'), ('sooda'), ('soolo'), ('sooma'), ('soopa'),
('soosi'), ('sopia'), ('soppa'), ('soppi'), ('sorea'), ('sorja'), ('sormi'), ('sorry'), ('sorsa'), ('sorto'),
('sorva'), ('sorvi'), ('sossu'), ('sotia'), ('sotka'), ('sotku'), ('soutu'), ('souvi'), ('spora'), ('spray'),
('sprii'), ('stadi'), ('stara'), ('stidi'), ('stola'), ('stout'), ('stydi'), ('sueta'), ('suhde'), ('sujua'),
('sujut'), ('sukia'), ('sukka'), ('suksi'), ('sulaa'), ('sulfa'), ('sulho'), ('sulje'), ('sulka'), ('sulku'),
('sumea'), ('summa'), ('sunna'), ('sunni'), ('suoda'), ('suoja'), ('suola'), ('suoli'), ('suomi'), ('suomu'),
('suoni'), ('suopa'), ('suora'), ('suova'), ('suppa'), ('suppo'), ('surku'), ('surma'), ('surra'), ('surve'),
('sushi'), ('sussu'), ('sutia'), ('sutki'), ('suttu'), ('suude'), ('suufi'), ('suula'), ('suura'), ('suure'),
('suuri'), ('suute'), ('svedu'), ('swing'), ('sydän'), ('sykli'), ('syksy'), ('sylki'), ('sylky'), ('sylys'),
('synti'), ('synty'), ('syrjä'), ('sysiä'), ('syyhy'), ('syylä'), ('syyni'), ('syyte'), ('syödä'), ('syöjä'),
('syöpä'), ('syöte'), ('sähke'), ('sähkö'), ('sähly'), ('sählä'), ('säilä'), ('säilö'), ('säkki'), ('sälli'),
('sänki'), ('sänky'), ('säppi'), ('särki'), ('särky'), ('särmi'), ('särmä'), ('sätky'), ('sätkä'), ('sävel'),
('säyne'), ('sääde'), ('sääli'), ('sääri'), ('sääty'), ('säätö'), ('sössö');

-- Words starting with T
INSERT INTO finnish_words(word) VALUES
('taain'), ('taaja'), ('taala'), ('taara'), ('taata'), ('taeta'), ('tafti'), ('tahko'), ('tahma'), ('tahna'),
('tahra'), ('tahti'), ('tahto'), ('taide'), ('taido'), ('taiga'), ('taiji'), ('taika'), ('taimi'), ('taita'),
('taite'), ('taito'), ('taive'), ('taivo'), ('takaa'), ('takia'), ('takka'), ('takki'), ('takku'), ('takoa'),
('taksa'), ('taksi'), ('takuu'), ('talas'), ('talja'), ('talla'), ('talli'), ('talvi'), ('tamma'), ('tammi'),
('tango'), ('tanhu'), ('tanka'), ('tanko'), ('tapas'), ('tappi'), ('tappo'), ('tapsi'), ('tarha'), ('tarke'),
('tarmo'), ('tarot'), ('tarra'), ('tarve'), ('tasan'), ('tasku'), ('tassi'), ('tassu'), ('tatar'), ('tatsi'),
('tatti'), ('tauko'), ('taula'), ('taulu'), ('tauti'), ('tavan'), ('tavis'), ('teddy'), ('teema'), ('teeri'),
('teesi'), ('tehdä'), ('teili'), ('teini'), ('tekno'), ('telje'), ('teljo'), ('telki'), ('teloa'), ('tempe'),
('tempo'), ('tenho'), ('terho'), ('teriö'), ('termi'), ('terva'), ('terve'), ('teräs'), ('tesla'), ('tesma'),
('tessi'), ('testi'), ('tetra'), ('tiara'), ('tiede'), ('tiera'), ('tieto'), ('tietä'), ('tiheä'), ('tihku'),
('tiili'), ('tiima'), ('tiimi'), ('tiine'), ('tiinu'), ('tiira'), ('tikka'), ('tikki'), ('tikku'), ('tikli'),
('tilde'), ('tilhi'), ('tilke'), ('tilli'), ('tilsa'), ('tilus'), ('timmi'), ('tinka'), ('tinki'), ('tippa'),
('tippi'), ('tirri'), ('tiski'), ('tisle'), ('tissi'), ('tiuha'), ('tiuku'), ('toast'), ('toeta'), ('toimi'),
('toive'), ('toivo'), ('tokka'), ('tokko'), ('tolar'), ('tollo'), ('tonne'), ('tonni'), ('tonus'), ('tooga'),
('toope'), ('toora'), ('toosa'), ('toppa'), ('toppi'), ('torke'), ('torni'), ('torso'), ('torua'), ('torut'),
('torvi'), ('tosin'), ('tosio'), ('tossu'), ('totta'), ('touhu'), ('touko'), ('touvi'), ('trial'), ('tuhat'),
('tuhka'), ('tuhma'), ('tuhnu'), ('tuhru'), ('tuhti'), ('tuhto'), ('tuija'), ('tuiju'), ('tuike'), ('tuiki'),
('tuima'), ('tukea'), ('tukka'), ('tukki'), ('tukko'), ('tukku'), ('tukos'), ('tulke'), ('tulla'), ('tulli'),
('tulos'), ('tulva'), ('tumma'), ('tunku'), ('tunne'), ('tunti'), ('tunto'), ('tuntu'), ('tuoda'), ('tuohi'),
('tuoja'), ('tuoli'), ('tuomi'), ('tuoni'), ('tuore'), ('tuote'), ('tupas'), ('tupee'), ('tupla'), ('tuppi'),
('tuppo'), ('tupsu'), ('turbo'), ('turha'), ('turku'), ('turma'), ('turpa'), ('turri'), ('turso'), ('turta'),
('turva'), ('turve'), ('tuska'), ('tussi'), ('tussu'), ('tutia'), ('tutka'), ('tutor'), ('tutsi'), ('tutti'),
('tuttu'), ('tutua'), ('tuuba'), ('tuubi'), ('tuuli'), ('tuuma'), ('tuura'), ('tuuri'), ('tweed'), ('twist'),
('tyhjä'), ('tyhjö'), ('tyhmä'), ('tykki'), ('tykky'), ('tyköä'), ('tylla'), ('tylli'), ('tylsä'), ('tynkä'),
('typpi'), ('typäs'), ('tyriä'), ('tyrmä'), ('tyrni'), ('tytti'), ('tyttö'), ('tytyy'), ('tytär'), ('tyven'),
('tyyli'), ('tyyni'), ('tyyny'), ('tähde'), ('tähkä'), ('tähti'), ('tähän'), ('täkki'), ('tälli'), ('tänne'),
('täplä'), ('tässä'), ('tästä'), ('täten'), ('tätsy'), ('täysi'), ('täyte'), ('töhkä'), ('töhnä'), ('töhry'),
('tölli'), ('töllö'), ('töniä'), ('törky'), ('törmä'), ('tötsä'), ('töyry');

-- Words starting with U
INSERT INTO finnish_words(word) VALUES
('uhata'), ('uhkea'), ('uhkua'), ('uhota'), ('uikku'), ('uinti'), ('uinua'), ('uisko'), ('uitto'), ('ujous'),
('ukuli'), ('ulina'), ('uljas'), ('ulkoa'), ('uloin'), ('uloke'), ('ulota'), ('ultra'), ('ulvoa'), ('umami'),
('umbra'), ('ummet'), ('umpio'), ('unssi'), ('upeus'), ('upota'), ('upote'), ('upsis'), ('urhea'), ('urina'),
('usein'), ('useus'), ('uskis'), ('uskoa'), ('utare'), ('utelu'), ('utsia'), ('uudin'), ('uumen'), ('uupua'),
('uuras'), ('uurna'), ('uurre'), ('uurto'), ('uusia'), ('uutto'), ('uuttu');

-- Words starting with V
INSERT INTO finnish_words(word) VALUES
('vaade'), ('vaaka'), ('vaali'), ('vaara'), ('vaari'), ('vaasi'), ('vaata'), ('vaate'), ('vaavi'), ('vahti'),
('vahva'), ('vaihe'), ('vaimo'), ('vaino'), ('vainu'), ('vaisu'), ('vaiti'), ('vaiva'), ('vajaa'), ('vakaa'),
('vakio'), ('vakka'), ('vaksi'), ('valaa'), ('valas'), ('valhe'), ('valin'), ('valio'), ('valju'), ('valli'),
('valmu'), ('valos'), ('valta'), ('valua'), ('valve'), ('vamma'), ('vanha'), ('vanja'), ('vanki'), ('vanna'),
('vanne'), ('vanua'), ('vapaa'), ('vappu'), ('varas'), ('varho'), ('varis'), ('varjo'), ('varma'), ('varoa'),
('varpu'), ('varsa'), ('varsi'), ('varte'), ('varus'), ('varvi'), ('vasen'), ('vaski'), ('vasoa'), ('vasta'),
('vaste'), ('vatja'), ('vatsa'), ('vatti'), ('vattu'), ('vaunu'), ('vauva'), ('vedin'), ('vedos'), ('vehje'),
('vehka'), ('vehnä'), ('veisu'), ('veivi'), ('vekki'), ('velho'), ('velka'), ('velli'), ('velmu'), ('venda'),
('venhe'), ('venho'), ('venyä'), ('venät'), ('vepsä'), ('verbi'), ('veres'), ('verho'), ('verka'), ('verme'),
('verso'), ('verta'), ('verto'), ('veska'), ('veski'), ('vesoa'), ('vessa'), ('vetää'), ('vibra'), ('vichy'),
('video'), ('viedä'), ('viehe'), ('viejä'), ('vielä'), ('vieno'), ('vieri'), ('vihje'), ('vihko'), ('vihma'),
('vihne'), ('vihta'), ('viila'), ('viili'), ('viilu'), ('viima'), ('viime'), ('viina'), ('viini'), ('viira'),
('viiri'), ('viiru'), ('viisi'), ('viisu'), ('viita'), ('viite'), ('viiva'), ('viive'), ('viklo'), ('vilja'),
('vilke'), ('villa'), ('villi'), ('vimma'), ('vimpa'), ('vinha'), ('vinka'), ('vinku'), ('viola'), ('vippa'),
('vippi'), ('vireä'), ('virhe'), ('viriö'), ('virka'), ('virke'), ('virna'), ('virne'), ('virpi'), ('virsi'),
('virsu'), ('virta'), ('virua'), ('virus'), ('visio'), ('viski'), ('vissi'), ('vissy'), ('visti'), ('visva'),
('vitja'), ('vitka'), ('vitoa'), ('vitsa'), ('vitsi'), ('vittu'), ('viulu'), ('vlogi'), ('vodka'), ('vodou'),
('vohla'), ('voida'), ('voide'), ('voima'), ('vokki'), ('vormu'), ('votka'), ('vouti'), ('vulva'), ('vuode'),
('vuohi'), ('vuoka'), ('vuolu'), ('vuona'), ('vuono'), ('vuori'), ('vuoro'), ('vuosi'), ('vuota'), ('vuoto'),
('vyöry'), ('vyöte'), ('vähin'), ('vähän'), ('väite'), ('väive'), ('väljä'), ('välke'), ('välys'), ('vänkä'),
('värve'), ('väsky'), ('väsyä'), ('vätys'), ('väylä'), ('väärä');

-- Words starting with W
INSERT INTO finnish_words(word) VALUES
('watti'), ('webbi'), ('weber'), ('wessi'), ('wokki');

-- Words starting with X
-- No words

-- Words starting with Y
INSERT INTO finnish_words(word) VALUES
('yhdes'), ('yhtiö'), ('yhtye'), ('yhtyä'), ('yhäti'), ('yksin'), ('yksiö'), ('yletä'), ('ylevä'), ('ylite'),
('ylpeä'), ('yltyä'), ('yltää'), ('ylväs'), ('ylävä'), ('ymppi'), ('yninä'), ('ynseä'), ('yrmeä'), ('yrtti'),
('yskiä'), ('yskös'), ('ysäri'), ('yytee'), ('yöasu'), ('yökkö'), ('yöpuu'), ('yöpyä'), ('yötyö'), ('yötön'),
('yöuni');

-- Words starting with Z
INSERT INTO finnish_words(word) VALUES
('zloty'), ('zombi'), ('zoomi');

-- Words starting with Å
-- No words

-- Words starting with Ä
INSERT INTO finnish_words(word) VALUES
('ähinä'), ('ähkiä'), ('ähkyä'), ('ähkää'), ('äikkä'), ('äippä'), ('äiskä'), ('äityä'), ('äkeys'), ('äkkiä'),
('äksön'), ('äkämä'), ('äkätä'), ('älinä'), ('älkää'), ('älytä'), ('äläkä'), ('ämyri'), ('änkkä'), ('äpäre'),
('äpärä'), ('äreys'), ('ärinä'), ('ärjyä'), ('ärtsy'), ('ärtyä'), ('äsken'), ('äyräs'), ('ääliö'), ('äänes'),
('äänne'), ('ääntö');

-- Words starting with Ö
INSERT INTO finnish_words(word) VALUES
('öinen'), ('öisin'), ('ölinä'), ('örinä'), ('örkki'), ('överi');