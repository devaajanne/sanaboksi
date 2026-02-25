-- Original data from Kotus (CC BY 4.0): https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/nykysuomen-sana-aineistot/nykysuomen-sanalista/
-- Modified to fit this project's needs:
--      1) removed all words with fewer or more than 6 letters
--      2) removed words with diacritics (i.e. é, è, š)    
--      3) removed words ending in or including '-' (i.e. sika-)
--      4) removed derogatory words
--      5) removed words with a space in between (i.e. "au pair")

DELETE FROM finnish_words WHERE LENGTH(word) = 6;

-- Words starting with A
INSERT INTO finnish_words(word) VALUES
('aamuyö'), ('aarnio'), ('aatami'), ('aateli'), ('abachi'), ('abassi'), ('absidi'), ('action'), ('adagio'), ('adonis'),
('afasia'), ('afääri'), ('agaave'), ('agenda'), ('ahdata'), ('ahkera'), ('ahnaus'), ('ahneus'), ('ahrain'), ('ahtaus'),
('ahteri'), ('aidata'), ('aiempi'), ('aikava'), ('aikido'), ('ainian'), ('aisata'), ('aisaus'), ('aistia'), ('aistin'),
('aitaus'), ('aitous'), ('aituri'), ('aivina'), ('ajassa'), ('ajaton'), ('ajatus'), ('ajella'), ('ajojää'), ('ajokas'),
('ajokki'), ('ajokoe'), ('ajopuu'), ('ajotie'), ('ajoura'), ('akasia'), ('akkuna'), ('akordi'), ('akseli'), ('aktori'),
('akusto'), ('alakuu'), ('alamaa'), ('alanko'), ('alanne'), ('alaosa'), ('alapää'), ('alasin'), ('alasti'), ('albedo'),
('albumi'), ('alemma'), ('alempi'), ('alimma'), ('alinen'), ('alitse'), ('alitus'), ('alkaen'), ('alkaja'), ('alkali'),
('alkeet'), ('alkkis'), ('alkovi'), ('alkuun'), ('alkuyö'), ('alkydi'), ('aloite'), ('alokas'), ('aluksi'), ('alulla'),
('alumni'), ('alunen'), ('alusta'), ('alvari'), ('amfora'), ('amissi'), ('ammoin'), ('ampuja'), ('ananas'), ('anella'),
('anemia'), ('angora'), ('angsti'), ('anioni'), ('ankara'), ('ankeus'), ('anomus'), ('anoppi'), ('ansari'), ('antaja'),
('antava'), ('antura'), ('anturi'), ('aortta'), ('apassi'), ('apatia'), ('aplodi'), ('apollo'), ('apotti'), ('appela'),
('arabia'), ('aralia'), ('aramea'), ('arasti'), ('areena'), ('arenti'), ('aresti'), ('arkala'), ('arkuus'), ('armada'),
('armias'), ('aronia'), ('arvata'), ('arvaus'), ('arvelu'), ('aseapu'), ('asenne'), ('asento'), ('asetie'), ('asetin'),
('asetti'), ('asetus'), ('askare'), ('askele'), ('assari'), ('astalo'), ('astelu'), ('asteri'), ('astuja'), ('asukas'),
('asukki'), ('asumus'), ('asunto'), ('asuste'), ('asutus'), ('asuuri'), ('ateria'), ('atolli'), ('atopia'), ('atrain'),
('atrium'), ('atulat'), ('aukile'), ('aulius'), ('aurata'), ('auraus'), ('aurora'), ('autere'), ('autius'), ('auttaa'),
('autuas'), ('autuus'), ('avaaja'), ('avanne'), ('avanto'), ('avatar'), ('avauma'), ('aviisi'), ('avitus'), ('avoero'),
('avokas'), ('avokki'), ('avomaa'), ('avosuo'), ('avuste'), ('avuton');

-- Words starting with B
INSERT INTO finnish_words(word) VALUES
('bageli'), ('bailut'), ('baltti'), ('barium'), ('beagle'), ('bentso'), ('bestis'), ('betoni'), ('biblia'), ('biitsi'),
('biitti'), ('bileet'), ('binomi'), ('bioase'), ('birdie'), ('bisnes'), ('bistro'), ('bitter'), ('bitumi'), ('blazer'),
('blokki'), ('blondi'), ('bluffi'), ('boccia'), ('bodari'), ('bodata'), ('bodaus'), ('bofori'), ('bolero'), ('bonsai'),
('boomer'), ('boordi'), ('bootsi'), ('borssi'), ('bosnia'), ('bosoni'), ('brahma'), ('brandi'), ('brandy'), ('brassi'),
('bridge'), ('britti'), ('broidi'), ('brunch'), ('brutto'), ('bryssä'), ('brändi'), ('buffet'), ('buklee'), ('bulkki'),
('buuata'), ('buuaus'), ('buutsi'), ('buzuki');

-- Words starting with C
INSERT INTO finnish_words(word) VALUES
('caddie'), ('campus'), ('cancan'), ('caprit'), ('cesium'), ('charmi'), ('chatti'), ('chinot'), ('churro'), ('cicero'),
('cirrus'), ('collie'), ('contra'), ('cookie'), ('coulis'), ('cowboy'), ('curuba');

-- Words starting with D
INSERT INTO finnish_words(word) VALUES
('daalia'), ('dealer'), ('deejii'), ('deismi'), ('deisti'), ('deitti'), ('delata'), ('demari'), ('demoni'), ('demota'),
('denier'), ('denimi'), ('dermis'), ('design'), ('diaari'), ('diesel'), ('digata'), ('dipata'), ('dipoli'), ('divari'),
('dokata'), ('dokaus'), ('domino'), ('donkki'), ('doping'), ('draama'), ('draivi'), ('drakma'), ('dreeni'), ('dreija'),
('drilli'), ('drooni'), ('druidi'), ('druusi'), ('dubata'), ('dublee'), ('duetto'), ('dynamo');

-- Words starting with E
INSERT INTO finnish_words(word) VALUES
('edelle'), ('edellä'), ('edeltä'), ('edemmä'), ('edessä'), ('edestä'), ('edikti'), ('editio'), ('editse'), ('edukas'),
('edusta'), ('efekti'), ('ehjyys'), ('ehompi'), ('ehoste'), ('ekstra'), ('eksymä'), ('elanto'), ('elatus'), ('elegia'),
('elellä'), ('elikko'), ('elikkä'), ('elkeet'), ('eloisa'), ('elokuu'), ('elossa'), ('eloton'), ('elukka'), ('elvyke'),
('elämys'), ('elätti'), ('emakko'), ('embryo'), ('emiiri'), ('empire'), ('emäkki'), ('emämaa'), ('emäntä'), ('emäpuu'),
('emätin'), ('encore'), ('enempi'), ('eniten'), ('enkeli'), ('entäpä'), ('epäily'), ('epäkäs'), ('erakko'), ('eranto'),
('eriste'), ('eritys'), ('eriävä'), ('erossa'), ('erotin'), ('erotus'), ('eräajo'), ('erämaa'), ('esikko'), ('esille'),
('esillä'), ('esitys'), ('esityö'), ('eskari'), ('estely'), ('esteri'), ('estymä'), ('estäjä'), ('etaani'), ('etappi'),
('eteeni'), ('etemmä'), ('etikka'), ('etinen'), ('etsata'), ('etsaus'), ('etsijä'), ('etsivä'), ('ettone'), ('etuala'),
('etuilu'), ('etumus'), ('etuosa'), ('etuovi'), ('etupää'), ('etyyni'), ('etätyö'), ('evakko'), ('eväkäs'), ('eväste');

-- Words starting with F
INSERT INTO finnish_words(word) VALUES
('faarao'), ('fajita'), ('fallos'), ('falski'), ('faradi'), ('farkku'), ('farkut'), ('farssi'), ('fasadi'), ('feijoa'),
('feikki'), ('fenoli'), ('feresi'), ('fiasko'), ('fibata'), ('fibaus'), ('fiesta'), ('fiikus'), ('fiilis'), ('fiktio'),
('filkka'), ('filtti'), ('filuri'), ('finito'), ('fissio'), ('flaami'), ('flaksi'), ('fleece'), ('fleksi'), ('fliisi'),
('flikka'), ('flokki'), ('floksi'), ('floora'), ('floppi'), ('fluori'), ('fondue'), ('fondyy'), ('fontti'), ('fotoni'),
('fraasi'), ('frakki'), ('frangi'), ('fransu'), ('freesi'), ('frendi'), ('freoni'), ('fresko'), ('fressi'), ('fretti'),
('friisi'), ('frilla'), ('fritsu'), ('frotee'), ('fudata'), ('fuksia'), ('funkis'), ('futari'), ('futata'), ('futsal'),
('fuusio'), ('fyrkka');

-- Words starting with G
INSERT INTO finnish_words(word) VALUES
('gallup'), ('gaucho'), ('geimit'), ('geisha'), ('geisir'), ('gelato'), ('gemena'), ('gemssi'), ('gender'), ('genomi'),
('geysir'), ('ghetto'), ('gigolo'), ('gloria'), ('gluoni'), ('gootti'), ('gospel'), ('graavi'), ('gramma'), ('grappa'),
('gravis'), ('griini'), ('grilli'), ('grippi'), ('grivna'), ('groove'), ('grunge'), ('guassi'), ('gurmee');

-- Words starting with H
INSERT INTO finnish_words(word) VALUES
('haahka'), ('haahti'), ('haaksi'), ('haalea'), ('haalia'), ('haapio'), ('haaroa'), ('haasia'), ('haaska'), ('haaste'),
('haasto'), ('haavia'), ('haenta'), ('haikea'), ('hailea'), ('haipua'), ('haista'), ('haisti'), ('haitek'), ('haitta'),
('haiven'), ('hajota'), ('hakata'), ('hakaus'), ('hakija'), ('hakkuu'), ('halata'), ('halaus'), ('halava'), ('haljas'),
('halkio'), ('halkoa'), ('halpis'), ('halssi'), ('haltia'), ('halumi'), ('haluta'), ('hamaan'), ('hamara'), ('hammas'),
('hamppu'), ('hamuta'), ('hanami'), ('hanska'), ('hantti'), ('hanuri'), ('hapata'), ('hapate'), ('hapera'), ('hapero'),
('hapete'), ('hapoke'), ('harata'), ('haraus'), ('harava'), ('harjas'), ('harjus'), ('harkat'), ('harkko'), ('harmaa'),
('harmio'), ('harppi'), ('harppu'), ('harras'), ('harsia'), ('hartia'), ('hartsi'), ('hatara'), ('hatkat'), ('haukka'),
('haukku'), ('hauras'), ('hauska'), ('hautoa'), ('hautua'), ('haveri'), ('havina'), ('hebrea'), ('hedari'), ('heeros'),
('hehkeä'), ('hehkua'), ('heikko'), ('heilua'), ('heippa'), ('heitin'), ('heitto'), ('hekuma'), ('heleys'), ('helinä'),
('helium'), ('helliä'), ('helmus'), ('helppo'), ('helske'), ('heltta'), ('heltyä'), ('hempeä'), ('hemppo'), ('henkiä'),
('hennoa'), ('hepene'), ('heprea'), ('hepuli'), ('heretä'), ('hereys'), ('herkku'), ('herkkä'), ('herpes'), ('hersyä'),
('hertsi'), ('hertta'), ('heräte'), ('herätä'), ('hetale'), ('heteka'), ('hetero'), ('hetkua'), ('hetula'), ('hiekka'),
('hieman'), ('hieroa'), ('hierre'), ('hierto'), ('hihhei'), ('hihkua'), ('hiihto'), ('hiilto'), ('hiipiä'), ('hiippa'),
('hiipua'), ('hiitti'), ('hikari'), ('hikevä'), ('hilata'), ('hilaus'), ('hiljaa'), ('hiljan'), ('hilkka'), ('hillua'),
('hilpeä'), ('himmeä'), ('himota'), ('himpun'), ('hinata'), ('hinaus'), ('hinkki'), ('hinkua'), ('hionta'), ('hiphop'),
('hipsiä'), ('hirnua'), ('hirssi'), ('hirtto'), ('hirvas'), ('hirveä'), ('hirviö'), ('hisaus'), ('hitaus'), ('hiukan'),
('hiukka'), ('hiukoa'), ('hiutua'), ('hodari'), ('hoenta'), ('hohkaa'), ('hohkua'), ('hohtaa'), ('hoikka'), ('hoitaa'),
('hoitsu'), ('hoitua'), ('hokema'), ('holkki'), ('holtti'), ('homing'), ('homous'), ('homssu'), ('horina'), ('horjua'),
('horkka'), ('horros'), ('horsma'), ('horsti'), ('hotdog'), ('hotkia'), ('houkka'), ('houria'), ('housut'), ('huhkia'),
('huhmar'), ('huhtoa'), ('huhuta'), ('huikea'), ('huikka'), ('huikoa'), ('huilia'), ('huimia'), ('huippu'), ('huisin'),
('huiska'), ('huiske'), ('huisku'), ('huitoa'), ('hujaus'), ('hukata'), ('hukkua'), ('hulina'), ('huljua'), ('hulpio'),
('humala'), ('humaus'), ('humina'), ('hummus'), ('humppa'), ('hunaja'), ('huntti'), ('huoata'), ('huojua'), ('huokea'),
('huokua'), ('huolia'), ('huolto'), ('huomen'), ('huomio'), ('huopua'), ('huorin'), ('huotra'), ('hupsia'), ('hupsis'),
('huraus'), ('hurina'), ('hurmio'), ('hurmos'), ('hurraa'), ('hursti'), ('hurtta'), ('hurtti'), ('hutera'), ('hutkia'),
('huuhaa'), ('huuhde'), ('huulio'), ('huurre'), ('huussi'), ('huutaa'), ('huveta'), ('huvila'), ('hybris'), ('hyeena'),
('hyinen'), ('hylkiä'), ('hylkiö'), ('hyllyä'), ('hylätä'), ('hyminä'), ('hymytä'), ('hyppiä'), ('hypätä'), ('hyrinä'),
('hyrske'), ('hyrsky'), ('hyräys'), ('hytinä'), ('hytkyä'), ('hyvike'), ('hyvite'), ('hyvyys'), ('hyyhmä'), ('hyypiö'),
('hyytyä'), ('hyytää'), ('hyökyä'), ('hyöriä'), ('hyötyä'), ('hyötää'), ('häikkä'), ('häilyä'), ('häipyä'), ('häiriö'),
('häiskä'), ('hälinä'), ('hälytä'), ('häläri'), ('hämärä'), ('hämätä'), ('hämäys'), ('hännys'), ('härkki'), ('härski'),
('hässiä'), ('hävetä'), ('hävite'), ('hävitä'), ('häälyä'), ('hääriä'), ('häätää'), ('hölinä'), ('hölkkä'), ('höltyä'),
('hömppä'), ('hömpsy'), ('hönkiä'), ('höntsy'), ('höntsä'), ('höntti'), ('höperö'), ('höpinä'), ('höpsis'), ('höpsiä'),
('hörppy'), ('hörtsö'), ('höröön'), ('höveli'), ('höyhen'), ('höykky'), ('höyste'), ('höystö');

-- Words starting with I
INSERT INTO finnish_words(word) VALUES
('idempi'), ('idiomi'), ('idylli'), ('idätys'), ('iestää'), ('ihahaa'), ('ihailu'), ('ihanne'), ('ihokas'), ('ihokoe'),
('iivana'), ('ikenet'), ('ikijää'), ('ikinen'), ('ikioma'), ('ikiuni'), ('ikkuna'), ('ikäero'), ('iljetä'), ('ilkeys'),
('ilkkua'), ('ilmata'), ('ilmaus'), ('ilmava'), ('ilmetä'), ('iloita'), ('iloton'), ('iltama'), ('iltayö'), ('imaami'),
('imaisu'), ('imarre'), ('imelle'), ('imetys'), ('imikkä'), ('impata'), ('indigo'), ('indium'), ('inessä'), ('infota'),
('inhota'), ('inistä'), ('innota'), ('inttää'), ('irkata'), ('ironia'), ('irrota'), ('irstas'), ('irtain'), ('irveen'),
('irviin'), ('iskemä'), ('iskevä'), ('iskias'), ('iskijä'), ('iskuri'), ('isoeno'), ('isoisä'), ('isonen'), ('isosti'),
('istuin'), ('istuma'), ('istute'), ('isukki'), ('isäntä'), ('isätön'), ('italia'), ('itikka'), ('itkijä'), ('itsari'),
('itseys'), ('itäosa'), ('ivailu'), ('iäinen');

-- Words starting with J
INSERT INTO finnish_words(word) VALUES
('jaardi'), ('jaarli'), ('jaella'), ('jakaja'), ('jakamo'), ('jakaus'), ('jakelu'), ('jaksaa'), ('jalake'), ('jalava'),
('jalkio'), ('jamaan'), ('jamppa'), ('jamssi'), ('jankko'), ('janota'), ('jaosto'), ('jaoton'), ('jaotus'), ('japani'),
('jargon'), ('jaspis'), ('jassoo'), ('jatkaa'), ('jatkos'), ('jatkua'), ('jauhaa'), ('jauhin'), ('jeeppi'), ('jeesus'),
('jehova'), ('jenkka'), ('jenkki'), ('jepari'), ('jerkki'), ('jersey'), ('jesidi'), ('jessus'), ('jestas'), ('jigaus'),
('jiippi'), ('jippii'), ('jockey'), ('jodidi'), ('johdin'), ('johdos'), ('johtaa'), ('johtua'), ('joiata'), ('joikua'),
('joisto'), ('jokeri'), ('jollei'), ('jolppi'), ('jorata'), ('jorina'), ('joskin'), ('joskus'), ('jotain'), ('jotkin'),
('jotkut'), ('jottei'), ('jouhea'), ('joukko'), ('jousto'), ('joutaa'), ('jouten'), ('joutua'), ('judata'), ('judogi'),
('judoka'), ('jugend'), ('juhlia'), ('juilia'), ('juippi'), ('julkea'), ('julkku'), ('jumala'), ('jumiin'), ('jumppa'),
('junior'), ('juntta'), ('juntti'), ('juohea'), ('juoksu'), ('juolua'), ('juonia'), ('juonne'), ('juonti'), ('juonto'),
('juoppo'), ('juopua'), ('juosta'), ('juoste'), ('juotin'), ('juotos'), ('juotto'), ('jupina'), ('jurous'), ('jurtta'),
('jurumi'), ('jutsku'), ('juudas'), ('juures'), ('juuria'), ('juusto'), ('juutas'), ('juutti'), ('jydätä'), ('jyhkeä'),
('jykevä'), ('jylinä'), ('jyminä'), ('jymäys'), ('jyrinä'), ('jyrkkä'), ('jyrsin'), ('jyrsiä'), ('jyrytä'), ('jyrätä'),
('jyräys'), ('jyskiä'), ('jyskyä'), ('jyskää'), ('jysäri'), ('jysäys'), ('jytinä'), ('jyystö'), ('jähmeä'), ('jäinen'),
('jäitse'), ('jäkälä'), ('jämerä'), ('jämpti'), ('jämtti'), ('jänskä'), ('järeys'), ('järinä'), ('järkky'), ('järsiä'),
('jätski'), ('jättää'), ('jäykkä'), ('jäytää'), ('jäänne'), ('jäänti'), ('jäärae'), ('jäätee'), ('jäätie'), ('jäätyä'),
('jäätää'), ('jösses'), ('jöötti');

-- Words starting with K
INSERT INTO finnish_words(word) VALUES
('kaadin'), ('kaakao'), ('kaakki'), ('kaakko'), ('kaakku'), ('kaamea'), ('kaamos'), ('kaanon'), ('kaapia'), ('kaappi'),
('kaarna'), ('kaarne'), ('kaarre'), ('kaarti'), ('kaarto'), ('kaasus'), ('kaataa'), ('kaatua'), ('kaavin'), ('kaavio'),
('kabuki'), ('kadota'), ('kahden'), ('kahdes'), ('kaheli'), ('kahina'), ('kahluu'), ('kahmia'), ('kahtia'), ('kahvio'),
('kaikaa'), ('kaikki'), ('kaikua'), ('kaipuu'), ('kaisla'), ('kaista'), ('kaivaa'), ('kaivin'), ('kaivos'), ('kaivuu'),
('kajari'), ('kajaus'), ('kajava'), ('kajota'), ('kakadu'), ('kakara'), ('kakata'), ('kakkia'), ('kaksin'), ('kaksio'),
('kaktus'), ('kalifi'), ('kalina'), ('kalium'), ('kalkki'), ('kallas'), ('kallio'), ('kallis'), ('kalori'), ('kalpea'),
('kalsea'), ('kalske'), ('kaltio'), ('kaluta'), ('kalvaa'), ('kalvas'), ('kalvia'), ('kalvin'), ('kamala'), ('kamana'),
('kamara'), ('kamari'), ('kambri'), ('kameli'), ('kamera'), ('kammio'), ('kammoa'), ('kamppi'), ('kampus'), ('kanala'),
('kanava'), ('kaneli'), ('kangas'), ('kankea'), ('kankku'), ('kannas'), ('kannel'), ('kannin'), ('kannus'), ('kanoni'),
('kansio'), ('kanssa'), ('kantaa'), ('kantio'), ('kantri'), ('kantti'), ('kapalo'), ('kapeus'), ('kapina'), ('kapine'),
('kapiot'), ('kaplas'), ('kappas'), ('kapris'), ('kapsaa'), ('kapula'), ('karata'), ('karate'), ('karhea'), ('karibu'),
('karies'), ('karike'), ('karjua'), ('karkea'), ('karkki'), ('karmea'), ('karmia'), ('karppi'), ('karree'), ('karsas'),
('karsea'), ('karsia'), ('karski'), ('karsta'), ('karsti'), ('kartio'), ('kartta'), ('karttu'), ('karuus'), ('karvas'),
('karvoa'), ('kasari'), ('kasata'), ('kasaus'), ('kasino'), ('kaskas'), ('kastaa'), ('kastua'), ('kasvaa'), ('kasvio'),
('kasvis'), ('kasvot'), ('kataja'), ('katala'), ('kateus'), ('katkoa'), ('katkos'), ('katodi'), ('katras'), ('katsoa'),
('kattaa'), ('kauhea'), ('kauhoa'), ('kaukaa'), ('kaukis'), ('kaulia'), ('kaulin'), ('kaulus'), ('kaunis'), ('kauppa'),
('kauris'), ('kautsu'), ('kautta'), ('kavala'), ('kaveri'), ('kaveta'), ('kavuta'), ('keeppi'), ('kehite'), ('kehruu'),
('kehräs'), ('kehuja'), ('keidas'), ('keihäs'), ('keikka'), ('keimit'), ('keinua'), ('keissi'), ('keitin'), ('keitos'),
('keitto'), ('kekata'), ('keksiä'), ('kekäle'), ('kelata'), ('kelaus'), ('kelkka'), ('kelliä'), ('kellua'), ('kelmeä'),
('keltti'), ('kelvin'), ('kemppi'), ('kenkku'), ('kennel'), ('kenoon'), ('kenttä'), ('kepeys'), ('kepuli'), ('kerake'),
('keretä'), ('keritä'), ('kerjuu'), ('kerkeä'), ('kerkkä'), ('kermoa'), ('kerppu'), ('kerran'), ('kerros'), ('kerska'),
('kertoa'), ('kerttu'), ('kertyä'), ('kerubi'), ('keräin'), ('kerätä'), ('keräys'), ('kesken'), ('keskiö'), ('keskus'),
('kestää'), ('kesyys'), ('kesäyö'), ('ketale'), ('ketara'), ('ketoni'), ('ketään'), ('keuhko'), ('keulia'), ('kevari'),
('kevetä'), ('keveys'), ('keväin'), ('kiasma'), ('kiehua'), ('kiekko'), ('kiekua'), ('kieliä'), ('kielto'), ('kieppi'),
('kieriä'), ('kierre'), ('kierto'), ('kiesit'), ('kietoa'), ('kihara'), ('kihaus'), ('kihinä'), ('kihlat'), ('kihota'),
('kiihko'), ('kiikku'), ('kiille'), ('kiilto'), ('kiilua'), ('kiinne'), ('kiinni'), ('kiiriä'), ('kiirus'), ('kiiski'),
('kiisla'), ('kiista'), ('kiitos'), ('kiitti'), ('kiitää'), ('kiivas'), ('kiksit'), ('kikuju'), ('kilari'), ('kilaus'),
('kilinä'), ('kiljua'), ('kilkka'), ('kilkki'), ('killua'), ('kilpaa'), ('kiltsi'), ('kiltti'), ('kilvan'), ('kimara'),
('kimbri'), ('kimchi'), ('kimeys'), ('kimono'), ('kimppa'), ('kimppu'), ('kimuli'), ('kinata'), ('kinkku'), ('kinnas'),
('kinner'), ('kinttu'), ('kinuta'), ('kioski'), ('kipale'), ('kipata'), ('kiperä'), ('kipeys'), ('kipinä'), ('kippis'),
('kipuna'), ('kiramo'), ('kiretä'), ('kireys'), ('kirjoa'), ('kirkas'), ('kirkko'), ('kirkua'), ('kirota'), ('kirous'),
('kirpeä'), ('kirppa'), ('kirppu'), ('kirstu'), ('kirves'), ('kisata'), ('kiskoa'), ('kissus'), ('kitara'), ('kitata'),
('kitinä'), ('kitkeä'), ('kitsas'), ('kitsch'), ('kiukku'), ('kiwano'), ('kiverä'), ('kivetä'), ('kiveys'), ('kivuta'),
('klaani'), ('klaava'), ('klaavi'), ('klaffi'), ('klahvi'), ('klappi'), ('klikki'), ('klippi'), ('klipsi'), ('klisee'),
('klooni'), ('kloori'), ('kloppi'), ('klovni'), ('knaapi'), ('knalli'), ('knoppi'), ('knorri'), ('koeajo'), ('koeala'),
('koetin'), ('koetus'), ('kohaus'), ('kohden'), ('koheli'), ('kohelo'), ('koheta'), ('kohina'), ('kohota'), ('kohtio'),
('kohuta'), ('koiras'), ('koisia'), ('koitos'), ('koitto'), ('koitua'), ('koitus'), ('kojamo'), ('kokata'), ('kokoon'),
('kokous'), ('kolari'), ('kolata'), ('kolaus'), ('kolera'), ('koleus'), ('kolhia'), ('kolina'), ('kolkka'), ('kolkko'),
('kolmas'), ('kolmia'), ('kolmio'), ('koltta'), ('kolttu'), ('koluta'), ('komero'), ('komeus'), ('komppi'), ('kompus'),
('kondis'), ('konkka'), ('konsti'), ('kontio'), ('kontti'), ('kontto'), ('kookas'), ('koolla'), ('koolle'), ('koolon'),
('koonti'), ('koonto'), ('koossa'), ('kooste'), ('koosto'), ('kopata'), ('kopaus'), ('kopeus'), ('kopina'), ('kopsaa'),
('kopula'), ('koreus'), ('korina'), ('korjuu'), ('korkea'), ('korkki'), ('koroke'), ('korona'), ('korppi'), ('korppu'),
('korpus'), ('korska'), ('korsto'), ('kortsu'), ('kortti'), ('koruna'), ('korvis'), ('korvus'), ('kosher'), ('kosija'),
('kosini'), ('koskea'), ('kosmos'), ('kostaa'), ('kostea'), ('kostua'), ('kotelo'), ('kotiin'), ('kotilo'), ('kotona'),
('koukku'), ('koulia'), ('kouria'), ('koutsi'), ('kovaan'), ('kovera'), ('koveta'), ('kovete'), ('kovike'), ('kovite'),
('kovuus'), ('kraana'), ('kraavi'), ('krappi'), ('krassi'), ('kredit'), ('kreemi'), ('kreisi'), ('kreivi'), ('kreoli'),
('kreppi'), ('krepsi'), ('kriisi'), ('krilli'), ('krooli'), ('kroppa'), ('krossi'), ('krouvi'), ('kruksi'), ('kruska'),
('kruuna'), ('kruunu'), ('krypta'), ('krypto'), ('kryssi'), ('kräkki'), ('krääsä'), ('ksenon'), ('kuhina'), ('kuhkia'),
('kuhnia'), ('kuhnus'), ('kuikka'), ('kuinka'), ('kuiske'), ('kuisma'), ('kuisti'), ('kuitti'), ('kuivaa'), ('kuivio'),
('kuivua'), ('kukaan'), ('kukkea'), ('kukkia'), ('kukkua'), ('kukkuu'), ('kuksia'), ('kulaus'), ('kulkea'), ('kulkue'),
('kultti'), ('kuluma'), ('kumara'), ('kumaus'), ('kumina'), ('kumoon'), ('kumota'), ('kumous'), ('kumura'), ('kumuri'),
('kungfu'), ('kunkku'), ('kunnas'), ('kunnes'), ('kunnia'), ('kunnon'), ('kuntta'), ('kuohia'), ('kuohua'), ('kuokka'),
('kuolio'), ('kuolla'), ('kuopia'), ('kuoppa'), ('kuopus'), ('kuoria'), ('kuorma'), ('kupari'), ('kupata'), ('kupera'),
('kuplia'), ('kupoli'), ('kupula'), ('kupura'), ('kurare'), ('kurata'), ('kurina'), ('kurkku'), ('kurnia'), ('kurppa'),
('kursia'), ('kurssi'), ('kurttu'), ('kuskus'), ('kustos'), ('kutale'), ('kuteet'), ('kutiaa'), ('kutina'), ('kutoja'),
('kutomo'), ('kutrit'), ('kutsua'), ('kuudan'), ('kuudes'), ('kuulas'), ('kuulla'), ('kuulto'), ('kuulua'), ('kuumua'),
('kuuppa'), ('kuuria'), ('kuurna'), ('kuusio'), ('kuutio'), ('kuuton'), ('kuutti'), ('kuvake'), ('kuvata'), ('kuvaus'),
('kveeni'), ('kvinoa'), ('kyhätä'), ('kyhäys'), ('kyinen'), ('kykkiä'), ('kyljes'), ('kyljys'), ('kyllin'), ('kylmiö'),
('kylpeä'), ('kyltti'), ('kyltyä'), ('kylvää'), ('kylvös'), ('kylään'), ('kymmen'), ('kymppi'), ('kynnys'), ('kynnäs'),
('kynnös'), ('kynsiä'), ('kyntää'), ('kypsyä'), ('kypärä'), ('kyrsiä'), ('kysely'), ('kysyjä'), ('kysymä'), ('kysyvä'),
('kysäri'), ('kytkeä'), ('kytkin'), ('kytkyt'), ('kytkös'), ('kytätä'), ('kyyhky'), ('kyykky'), ('kyykkä'), ('kyynel'),
('kyyppi'), ('kyytiä'), ('kyyttö'), ('kyökki'), ('kähetä'), ('käheys'), ('kähinä'), ('kähmiä'), ('kähärä'), ('kämmen'),
('kämppä'), ('käninä'), ('käntty'), ('käpälä'), ('käpätä'), ('käreys'), ('kärinä'), ('kärkäs'), ('kärppä'), ('kärsiä'),
('kärytä'), ('käsine'), ('käsite'), ('käskeä'), ('kätevä'), ('kätilö'), ('kätkeä'), ('kätkyt'), ('kätyri'), ('kävely'),
('kävijä'), ('käynti'), ('käyttö'), ('käytös'), ('käädyt'), ('kääkkä'), ('käämiä'), ('käänne'), ('kääntö'), ('kääpiö'),
('käärin'), ('kääriä'), ('käärme'), ('köhinä'), ('kökkiä'), ('kölliä'), ('kömpiä'), ('köngäs'), ('köniin'), ('köntsä'),
('köntti'), ('könttä'), ('köntys'), ('könytä'), ('körtti'), ('kössiä'), ('köytös');

-- Words starting with L
INSERT INTO finnish_words(word) VALUES
('laahia'), ('laahus'), ('laakea'), ('laakio'), ('laakso'), ('laapis'), ('laardi'), ('laasta'), ('laasti'), ('laatia'),
('laatta'), ('ladata'), ('lahjoa'), ('lahjus'), ('lahota'), ('lahous'), ('laidun'), ('laikka'), ('laikku'), ('lailla'),
('laimea'), ('laimin'), ('lainen'), ('laipio'), ('laippa'), ('laisin'), ('laiska'), ('laisto'), ('laiton'), ('laitos'),
('laitto'), ('laivue'), ('lajike'), ('lajite'), ('lakana'), ('lakata'), ('lakeus'), ('lakmus'), ('lamaan'), ('lamata'),
('lammas'), ('lamppu'), ('lanata'), ('lanaus'), ('lankki'), ('lankku'), ('lannos'), ('lanssi'), ('lantio'), ('lantti'),
('lantto'), ('lanttu'), ('laossa'), ('lappaa'), ('lapsus'), ('larppi'), ('laseri'), ('lasite'), ('laskea'), ('laskin'),
('laskos'), ('lassie'), ('lataus'), ('latelu'), ('latina'), ('latino'), ('latkia'), ('latoja'), ('latomo'), ('lattea'),
('lattia'), ('laturi'), ('latvia'), ('latvoa'), ('latvus'), ('laueta'), ('lauhde'), ('laukka'), ('laukki'), ('laukku'),
('laukoa'), ('laulaa'), ('laupea'), ('lausua'), ('lautta'), ('laveri'), ('layout'), ('leegio'), ('legato'), ('lehaus'),
('lehmus'), ('lehtiä'), ('lehtiö'), ('leijua'), ('leikki'), ('leipoa'), ('leiska'), ('leivos'), ('lektio'), ('lekuri'),
('lelliä'), ('lellua'), ('lempeä'), ('lempiä'), ('lemput'), ('lemuta'), ('lenkki'), ('lennin'), ('lenseä'), ('lentis'),
('lentsu'), ('lentue'), ('lentää'), ('leppeä'), ('leppyä'), ('lerppu'), ('lerssi'), ('lesota'), ('letkeä'), ('letkis'),
('leuhka'), ('levada'), ('levetä'), ('leveys'), ('levike'), ('levite'), ('levitä'), ('levyke'), ('levyri'), ('levyte'),
('levätä'), ('leyhkä'), ('leyhyä'), ('liaani'), ('libero'), ('libido'), ('liehua'), ('liekki'), ('lienee'), ('liereä'),
('lieriö'), ('lieska'), ('liesma'), ('lietso'), ('lietsu'), ('lietto'), ('lihava'), ('lihota'), ('liidin'), ('liietä'),
('liikaa'), ('liikka'), ('liikki'), ('liioin'), ('liippa'), ('liirto'), ('liitin'), ('liitos'), ('liitto'), ('liitää'),
('likoon'), ('lilliä'), ('lillua'), ('limata'), ('limbus'), ('limppu'), ('limska'), ('linkki'), ('linkku'), ('linoli'),
('linssi'), ('liossa'), ('liosta'), ('liotus'), ('lipare'), ('liperi'), ('lipevä'), ('lipidi'), ('lipota'), ('lippis'),
('lippue'), ('lipsua'), ('lipuke'), ('liraus'), ('lirinä'), ('listiä'), ('lisuke'), ('lisäke'), ('lisätä'), ('lisäys'),
('litinä'), ('litium'), ('litkiä'), ('litteä'), ('littiö'), ('liueta'), ('liukas'), ('liukua'), ('liuota'), ('liuote'),
('liuska'), ('liuske'), ('livetä'), ('livree'), ('loafer'), ('lobata'), ('logata'), ('lohkoa'), ('loikka'), ('loikko'),
('loikoa'), ('loinen'), ('loisia'), ('loisio'), ('loiske'), ('loiste'), ('loisto'), ('loitsu'), ('lokari'), ('lokero'),
('loksaa'), ('loksua'), ('lolita'), ('lomaan'), ('lomake'), ('lompsa'), ('lonkka'), ('lootus'), ('loppua'), ('lopuke'),
('loraus'), ('lorina'), ('lorvia'), ('lotina'), ('lotion'), ('lotota'), ('louhia'), ('louhos'), ('loukko'), ('loukku'),
('lounas'), ('louske'), ('loveta'), ('loveus'), ('luenta'), ('luento'), ('luikka'), ('luinen'), ('luiska'), ('luisti'),
('luisto'), ('luisua'), ('lujaan'), ('lujeta'), ('lujike'), ('lujite'), ('lujuus'), ('lukema'), ('lukien'), ('lukija'),
('lukita'), ('luksus'), ('lumeta'), ('lumota'), ('lumous'), ('lumpio'), ('lumppu'), ('luntta'), ('luntti'), ('lunttu'),
('luokka'), ('luokki'), ('luokse'), ('luomus'), ('luonne'), ('luonti'), ('luonto'), ('luopio'), ('luopua'), ('luotsi'),
('luotta'), ('luotti'), ('luotto'), ('luovia'), ('lupaus'), ('luraus'), ('lurjus'), ('luudas'), ('luukku'), ('luulla'),
('luumen'), ('luuppi'), ('luupää'), ('luuska'), ('luusto'), ('luusua'), ('luutia'), ('luuton'), ('luuttu'), ('luutua'),
('luvata'), ('lyhetä'), ('lyhyys'), ('lykkiä'), ('lykätä'), ('lyllyä'), ('lymytä'), ('lypsin'), ('lypsää'), ('lysoli'),
('lysyyn'), ('lytätä'), ('lyönti'), ('lähete'), ('lähetä'), ('lähteä'), ('läikkä'), ('läimiä'), ('läiske'), ('läiskä'),
('läjätä'), ('läjäys'), ('lämmin'), ('lämpiö'), ('lämäri'), ('lämätä'), ('länget'), ('läntti'), ('läpsiä'), ('läpsyä'),
('läpsää'), ('lätinä'), ('lätkiä'), ('lääkis'), ('löhötä'), ('löllyä'), ('löntti'), ('löperö'), ('löpinä'), ('lörppö'),
('lörtsy'), ('löydös'), ('löyhkä'), ('löytyä'), ('löytää'), ('lööppi');

-- Words starting with M
INSERT INTO finnish_words(word) VALUES
('maaemo'), ('maammo'), ('maapuu'), ('maarin'), ('maasai'), ('maasto'), ('maaton'), ('maatto'), ('maatua'), ('maatyö'),
('madame'), ('madras'), ('mahous'), ('mahtaa'), ('mahtua'), ('maihin'), ('maikka'), ('maikki'), ('mainen'), ('mainio'),
('mainos'), ('mairea'), ('maissa'), ('maissi'), ('maista'), ('maisti'), ('maitse'), ('majava'), ('majuri'), ('makaki'),
('makaus'), ('makeus'), ('maksaa'), ('makuus'), ('malaga'), ('mallas'), ('malmio'), ('maltsa'), ('maltti'), ('mamero'),
('manala'), ('manata'), ('manaus'), ('manila'), ('mankka'), ('mankku'), ('mankua'), ('manner'), ('mantra'), ('marina'),
('marjoa'), ('market'), ('markka'), ('marras'), ('marski'), ('marssi'), ('martio'), ('martta'), ('maruna'), ('matala'),
('matami'), ('matara'), ('matelu'), ('matkia'), ('matkue'), ('matsku'), ('maukas'), ('maukua'), ('mauste'), ('mauton'),
('meedio'), ('mehevä'), ('meikki'), ('meikku'), ('meisti'), ('meitsi'), ('melano'), ('meloja'), ('meloni'), ('melske'),
('meluta'), ('menevä'), ('menijä'), ('menkat'), ('menkut'), ('mennyt'), ('menota'), ('mensut'), ('merino'), ('merkki'),
('mesoni'), ('mesota'), ('messut'), ('meteli'), ('metodi'), ('miekka'), ('mieliä'), ('mielle'), ('miikka'), ('miinus'),
('miitti'), ('miksei'), ('mikäli'), ('mikään'), ('miljöö'), ('miltei'), ('minimi'), ('minkki'), ('minttu'), ('minuus'),
('missio'), ('mitali'), ('mitata'), ('mitään'), ('moaree'), ('mobata'), ('mobile'), ('moguli'), ('mohair'), ('moikaa'),
('moikka'), ('moikua'), ('moinen'), ('moisio'), ('mojova'), ('mokata'), ('mokaus'), ('mokoma'), ('molari'), ('molske'),
('molski'), ('moneus'), ('monias'), ('monkua'), ('montaa'), ('monttu'), ('mopata'), ('mopedi'), ('mordva'), ('morjes'),
('morsio'), ('mortti'), ('morula'), ('motari'), ('motata'), ('moukka'), ('moukku'), ('moukua'), ('mousse'), ('muassa'),
('muheva'), ('muhina'), ('muhkea'), ('muikea'), ('muikku'), ('muisku'), ('muisti'), ('muisto'), ('mukaan'), ('mukana'),
('mukava'), ('mukiin'), ('mukina'), ('muksia'), ('mukula'), ('mukura'), ('mulkku'), ('mullah'), ('mullas'), ('mullos'),
('mumina'), ('munata'), ('munaus'), ('munkki'), ('muotti'), ('mureke'), ('murena'), ('murene'), ('mureta'), ('mureus'),
('murina'), ('murjoa'), ('murkku'), ('murros'), ('murska'), ('murske'), ('murtaa'), ('murtua'), ('musaka'), ('mustis'),
('mustua'), ('mutina'), ('muttei'), ('muumio'), ('muunto'), ('muussi'), ('muuten'), ('muutos'), ('muutto'), ('mykerö'),
('mylviä'), ('myntti'), ('myooma'), ('myrkky'), ('myrsky'), ('myrtsi'), ('myrtti'), ('myrtyä'), ('myynti'), ('myytti'),
('myöden'), ('myöntö'), ('myöstö'), ('myöten'), ('mädäte'), ('mädätä'), ('mäikyä'), ('mäikää'), ('mäiske'), ('mäjäys'),
('mäkärä'), ('mäntti'), ('märkiä'), ('märssy'), ('mäsänä'), ('mätkiä'), ('mättää'), ('määkiä'), ('määkyä'), ('määrly'),
('möhliä'), ('mölinä'), ('mölkky'), ('mölytä'), ('mönkiä'), ('mörinä'), ('mörkki'), ('mörsky'), ('mörskä'), ('möyheä'),
('möyhiä'), ('möykky'), ('möykkä'), ('möyriä');

-- Words starting with N
INSERT INTO finnish_words(word) VALUES
('naakka'), ('naamio'), ('naaras'), ('naarmu'), ('naatti'), ('nahina'), ('nahjus'), ('nahkea'), ('nahkoa'), ('naiivi'),
('nailon'), ('nainen'), ('nainti'), ('nainut'), ('najadi'), ('nakata'), ('naksaa'), ('naksua'), ('napalm'), ('napata'),
('napaus'), ('napero'), ('napina'), ('napsaa'), ('napsia'), ('napsua'), ('narina'), ('narske'), ('narsku'), ('narttu'),
('naseva'), ('natina'), ('naukku'), ('naukua'), ('nauraa'), ('nauris'), ('navaho'), ('navajo'), ('nelilö'), ('neljäs'),
('nelkku'), ('nelson'), ('nepata'), ('nerous'), ('nestor'), ('netota'), ('neukku'), ('neuloa'), ('neulos'), ('neutri'),
('neuvoa'), ('neuvos'), ('newton'), ('niellä'), ('nieriä'), ('nietos'), ('nigiri'), ('nihkeä'), ('niiata'), ('niiaus'),
('niinku'), ('niisiä'), ('niitti'), ('niitto'), ('niitty'), ('nikama'), ('niksaa'), ('niksua'), ('nilkka'), ('nilkki'),
('nilkku'), ('nimeke'), ('nimetä'), ('nimike'), ('nirhiä'), ('nirkko'), ('nitinä'), ('nitoja'), ('nituri'), ('niukka'),
('noheva'), ('noitua'), ('nojaan'), ('nojata'), ('nokare'), ('nokkia'), ('nolata'), ('nollas'), ('nolous'), ('nomadi'),
('nomini'), ('nootti'), ('nopeus'), ('norkko'), ('norppa'), ('norssi'), ('nostaa'), ('nostin'), ('notkea'), ('notkua'),
('nougat'), ('nousta'), ('noutaa'), ('nuijia'), ('nujuta'), ('nukata'), ('nukkua'), ('nukula'), ('nukute'), ('nulkki'),
('numero'), ('nuolla'), ('nuoska'), ('nuotio'), ('nuotta'), ('nuotti'), ('nupula'), ('nupura'), ('nurina'), ('nurkka'),
('nurkua'), ('nurtsi'), ('nussia'), ('nutria'), ('nuuska'), ('nuutua'), ('nyhtää'), ('nyintä'), ('nykerö'), ('nykinä'),
('nykäys'), ('nylkeä'), ('nynniä'), ('nyppiä'), ('nypylä'), ('nypätä'), ('nyreys'), ('nyrhiä'), ('nyrkki'), ('nyrpeä'),
('nytkiä'), ('nytkyä'), ('nytten'), ('nyyhke'), ('nyyhky'), ('nyysiä'), ('nyytti'), ('näemmä'), ('nähden'), ('näkemä'),
('näkevä'), ('näkijä'), ('näkymä'), ('näkyvä'), ('nälviä'), ('näppis'), ('näpätä'), ('näpäys'), ('näveri'), ('näytin'),
('näyttö'), ('näytös'), ('näämmä'), ('nörtti'), ('nöyhtä');

-- Words starting with O
INSERT INTO finnish_words(word) VALUES
('obeesi'), ('odelma'), ('odotus'), ('offset'), ('ohdake'), ('ohella'), ('ohenne'), ('ohessa'), ('ohesta'), ('ohitse'),
('ohitus'), ('ohjain'), ('ohjata'), ('ohjaus'), ('ohrana'), ('ohukas'), ('oikein'), ('oikeus'), ('oionta'), ('ojasto'),
('ojenne'), ('ojikko'), ('ojitus'), ('ojolla'), ('ojolle'), ('ojossa'), ('okseri'), ('oksete'), ('oksidi'), ('oleilu'),
('olemus'), ('olento'), ('oletus'), ('oliivi'), ('olkain'), ('oloasu'), ('olunen'), ('ometta'), ('omiaan'), ('omiste'), 
('ompele'), ('ompelu'), ('onania'), ('onkalo'), ('onkija'), ('onnela'), ('ontelo'), ('onyksi'), ('oomega'), ('opaali'), 
('opaste'), ('opetus'), ('opisto'), ('oppija'), ('optimi'), ('orakas'), ('oranki'), ('orgiat'), ('orjuus'), ('orpana'),
('orpous'), ('osaaja'), ('osakas'), ('osaksi'), ('osanen'), ('osasto'), ('osasyy'), ('osaton'), ('osinko'), ('ositus'), 
('osmani'), ('osmium'), ('osoite'), ('ostaja'), ('ostari'), ('ostelu'), ('osteri'), ('otanta'), ('otella'), ('otettu'),
('otsake'), ('otsoni'), ('ottaja'), ('ottamo'), ('ottava'), ('ottelu'), ('outlet'), ('outous'), ('output'), ('ovaali'), 
('ovisuu');

-- Words starting with P
INSERT INTO finnish_words(word) VALUES
('paahde'), ('paahto'), ('paakku'), ('paanne'), ('paapoa'), ('paappa'), ('paaria'), ('paarit'), ('paarma'), ('paasto'),
('paatos'), ('paatti'), ('paatua'), ('padota'), ('paella'), ('pagodi'), ('paheta'), ('pahkaa'), ('pahnue'), ('pahoin'),
('pahuus'), ('paikka'), ('paikko'), ('paimen'), ('painaa'), ('painia'), ('painin'), ('painos'), ('painua'), ('paippi'),
('paiste'), ('paisti'), ('paisto'), ('paisua'), ('paitis'), ('paitsi'), ('pakana'), ('pakara'), ('pakari'), ('pakata'),
('pakina'), ('pakoon'), ('pakora'), ('pakote'), ('paksoi'), ('pakuri'), ('palata'), ('palava'), ('paljas'), ('paljin'),
('paljon'), ('palkka'), ('palkki'), ('pallas'), ('pallea'), ('palsta'), ('palttu'), ('palvoa'), ('pamaus'), ('pamppu'),
('panama'), ('paneli'), ('panimo'), ('panini'), ('pankki'), ('pankko'), ('pantti'), ('paossa'), ('papana'), ('paperi'),
('parata'), ('parfee'), ('pariin'), ('parila'), ('parkki'), ('parkua'), ('paroni'), ('parras'), ('parsek'), ('parsia'),
('partia'), ('partio'), ('partsi'), ('pascal'), ('paskoa'), ('paspis'), ('passio'), ('passus'), ('pastis'), ('pasuri'),
('pateri'), ('patina'), ('patous'), ('patsas'), ('paukku'), ('paussi'), ('pedata'), ('pehmeä'), ('pehmis'), ('pehmyt'),
('peikko'), ('peippi'), ('peippo'), ('peitsi'), ('peitta'), ('peitto'), ('pekari'), ('pekoni'), ('pelata'), ('pelkka'),
('pelkkä'), ('pelote'), ('peluri'), ('pelätä'), ('pemppu'), ('penger'), ('penkka'), ('penkki'), ('penkoa'), ('pensas'),
('penseä'), ('penska'), ('pensoa'), ('pentue'), ('penätä'), ('pepino'), ('peplum'), ('perata'), ('perijä'), ('perimä'),
('perkiö'), ('perkuu'), ('permis'), ('persia'), ('pertsa'), ('peruke'), ('peruna'), ('peräti'), ('perätä'), ('perään'),
('peseta'), ('pesijä'), ('pestuu'), ('pesula'), ('pesuri'), ('pesäke'), ('petata'), ('petaus'), ('petkel'), ('pettyä'),
('pettää'), ('petäjä'), ('peukku'), ('picnic'), ('pidetä'), ('pidike'), ('pidäke'), ('pieksu'), ('pieles'), ('pielus'),
('pieniä'), ('pierrä'), ('piestä'), ('pihaus'), ('pihdit'), ('piheys'), ('pihinä'), ('pihiys'), ('piihin'), ('piikki'),
('piikko'), ('piikoa'), ('piillä'), ('piimaa'), ('piimiä'), ('piippo'), ('piippu'), ('piiras'), ('piirre'), ('piirto'),
('piiska'), ('piisku'), ('piispa'), ('piissä'), ('pikari'), ('pikeys'), ('piknik'), ('pilari'), ('pilata'), ('pilkka'),
('pilkki'), ('pilkku'), ('pilssi'), ('piltti'), ('pimetä'), ('pimeys'), ('pimppi'), ('pimpsa'), ('piñata'), ('pingis'),
('pinkeä'), ('pinkka'), ('pinkki'), ('pinkoa'), ('pinniä'), ('pinota'), ('pinssi'), ('pintti'), ('pinyin'), ('pipana'),
('pipari'), ('piplia'), ('piraus'), ('pirinä'), ('pirske'), ('pirssi'), ('pirsta'), ('pirteä'), ('pirtti'), ('pisama'),
('pisara'), ('pissis'), ('pissiä'), ('pistin'), ('pistos'), ('pistou'), ('pistää'), ('pitali'), ('pitely'), ('pitkin'),
('pituus'), ('pitäen'), ('pitäjä'), ('pitämä'), ('pitävä'), ('piukea'), ('piukka'), ('plaani'), ('plakki'), ('plasma'),
('pliisu'), ('plikka'), ('plombi'), ('plootu'), ('plussa'), ('plyymi'), ('plyysi'), ('pläkki'), ('pohdin'), ('pohjus'),
('pohtia'), ('poikia'), ('poikki'), ('poikue'), ('poimia'), ('poissa'), ('poiste'), ('poisto'), ('poitsu'), ('pokata'),
('pokeri'), ('poljin'), ('polkea'), ('polkka'), ('pollea'), ('polska'), ('polski'), ('poltin'), ('poltto'), ('pomada'),
('pomelo'), ('pomppa'), ('pomppu'), ('poncho'), ('ponnin'), ('pontti'), ('popata'), ('poppoo'), ('popsia'), ('popula'),
('porari'), ('porata'), ('poraus'), ('porina'), ('porkka'), ('porras'), ('porsas'), ('porsia'), ('portti'), ('portto'),
('posaus'), ('potero'), ('potkia'), ('poutia'), ('povari'), ('povata'), ('povaus'), ('pramea'), ('pressa'), ('pressi'),
('pressu'), ('presto'), ('priima'), ('priimi'), ('prikka'), ('prikku'), ('prioni'), ('prisma'), ('proffa'), ('proomu'),
('proosa'), ('proppu'), ('propri'), ('propsi'), ('prosit'), ('prossa'), ('pruuvi'), ('prässi'), ('prätkä'), ('psalmi'),
('psyyke'), ('pudota'), ('puhdas'), ('puhelu'), ('puhina'), ('puhkaa'), ('puhkia'), ('puhkoa'), ('puhkua'), ('puhuja'),
('puhuri'), ('puhuva'), ('puikea'), ('puikko'), ('puinen'), ('puinti'), ('puisto'), ('pujoke'), ('pukari'), ('pukata'),
('pukeet'), ('pukija'), ('pukimo'), ('pukine'), ('pulaus'), ('pulina'), ('pulkka'), ('pullea'), ('pulska'), ('pulssi'),
('pultti'), ('pummia'), ('pumppu'), ('punata'), ('punaus'), ('punkka'), ('punkki'), ('punkku'), ('punnus'), ('punoja'),
('punssi'), ('puntis'), ('puntti'), ('puolto'), ('puolue'), ('purema'), ('pureva'), ('purija'), ('purkaa'), ('purkka'),
('purkki'), ('pursua'), ('pusata'), ('pusero'), ('puskea'), ('puskin'), ('putata'), ('puteli'), ('putous'), ('puucee'),
('puuhka'), ('puukko'), ('puunto'), ('puupää'), ('puusee'), ('puuska'), ('puusti'), ('puusto'), ('puusyy'), ('puuton'),
('puutos'), ('puutua'), ('puutyö'), ('puzzle'), ('pyhyys'), ('pyjama'), ('pykimä'), ('pykälä'), ('pykätä'), ('pylkkä'),
('pyloni'), ('pylväs'), ('pyrkiä'), ('pyrstö'), ('pyrytä'), ('pystis'), ('pystyä'), ('pysyvä'), ('pysäys'), ('pyydys'),
('pyyhin'), ('pyykki'), ('pyynti'), ('pyyntö'), ('pyytää'), ('pyökki'), ('pyöreä'), ('pyöriä'), ('pyöriö'), ('pyörre'),
('pähkiä'), ('päihde'), ('päikkö'), ('päilyä'), ('päinsä'), ('päiste'), ('päiten'), ('pänniä'), ('pärinä'), ('pärske'),
('pärsky'), ('pärstä'), ('pätevä'), ('pätkiä'), ('päähän'), ('päälle'), ('päällä'), ('päältä'), ('pääluu'), ('pääoma'),
('pääosa'), ('pääovi'), ('päärly'), ('päärme'), ('pääsky'), ('päässä'), ('päästä'), ('päästö'), ('päätie'), ('päätyä'),
('päätyö'), ('päätäi'), ('päätön'), ('päätös'), ('pöhinä'), ('pökkiä'), ('pöksyt'), ('pökäle'), ('pökätä'), ('pölinä'),
('pölkky'), ('pölliä'), ('pölyte'), ('pölytä'), ('pöläys'), ('pönkkä'), ('pönttö'), ('pöperö'), ('pöpinä'), ('pörheä'),
('pörinä'), ('pörssi'), ('pösilö'), ('pössis'), ('pötkiä'), ('pöyheä'), ('pöyhin'), ('pöyhiä'), ('pöytye');

-- Words starting with Q
INSERT INTO finnish_words(word) VALUES
('quiche'), ('quinoa');

-- Words starting with R
INSERT INTO finnish_words(word) VALUES
('raakki'), ('raakku'), ('raakua'), ('raapia'), ('raappa'), ('raaste'), ('raataa'), ('raavas'), ('raavin'), ('rabies'),
('radium'), ('ragoût'), ('rahake'), ('rahina'), ('rahjus'), ('rahvas'), ('raikaa'), ('raikas'), ('raikua'), ('raippa'),
('raiska'), ('raitis'), ('raitti'), ('raivio'), ('rajain'), ('rajata'), ('rajaus'), ('rajoni'), ('rajuus'), ('raksaa'),
('raksia'), ('raksua'), ('ramina'), ('ramppi'), ('random'), ('rankka'), ('rankki'), ('ranska'), ('rantsu'), ('rapata'),
('rapeus'), ('rapiat'), ('rapina'), ('rappio'), ('rapsaa'), ('rapsia'), ('rasite'), ('raskas'), ('raskia'), ('rastas'),
('rastia'), ('rasvis'), ('ratamo'), ('ratina'), ('rating'), ('ratkoa'), ('ratsia'), ('raueta'), ('raukea'), ('raukka'),
('raukki'), ('raunio'), ('rausku'), ('ravata'), ('ravita'), ('ravuri'), ('reaali'), ('reesus'), ('reggae'), ('rehevä'),
('rehkiä'), ('reipas'), ('reissu'), ('reitti'), ('reivit'), ('rektio'), ('relata'), ('remppa'), ('remuta'), ('rengas'),
('renksu'), ('renttu'), ('repale'), ('repata'), ('reseda'), ('resori'), ('resuta'), ('retale'), ('retina'), ('retkua'),
('retkue'), ('reuhka'), ('reunus'), ('reutoa'), ('revari'), ('revetä'), ('rhesus'), ('riehua'), ('riekko'), ('riento'),
('riepoa'), ('rieska'), ('rietas'), ('riiata'), ('riipiä'), ('riipoa'), ('riippa'), ('riipus'), ('riista'), ('riisto'),
('riisua'), ('riitti'), ('riiviö'), ('rikkoa'), ('rikkua'), ('rillit'), ('rimpsa'), ('rimpsu'), ('rimssu'), ('rinkka'),
('rinnan'), ('rinnus'), ('rinuli'), ('ripari'), ('ripaus'), ('ripeys'), ('ripinä'), ('ripote'), ('rippis'), ('ripsiä'),
('ripsua'), ('ripuli'), ('risaus'), ('ristiä'), ('ritari'), ('ritilä'), ('ritinä'), ('riuska'), ('riutta'), ('riutua'),
('rivous'), ('rodium'), ('rohdin'), ('rohdos'), ('rohina'), ('rohkea'), ('rohtua'), ('roikaa'), ('roikka'), ('roikko'),
('roikku'), ('roikua'), ('roimia'), ('roiske'), ('roisto'), ('rojaus'), ('rokata'), ('rokote'), ('rokuli'), ('romani'),
('romina'), ('romppu'), ('rompsu'), ('romsku'), ('ronski'), ('rontti'), ('ropina'), ('ropsia'), ('roskis'), ('rotari'),
('roteva'), ('rouhea'), ('rouhia'), ('rouhin'), ('rouske'), ('rousku'), ('rouste'), ('routia'), ('rubato'), ('rucola'),
('ruhjoa'), ('ruiske'), ('ruisku'), ('rujous'), ('rukata'), ('rukola'), ('rukous'), ('ruksia'), ('ruladi'), ('rumeta'),
('rumuus'), ('runnoa'), ('runous'), ('runsas'), ('ruodis'), ('ruokis'), ('ruokki'), ('ruokko'), ('ruopia'), ('ruoska'),
('ruoste'), ('ruotia'), ('ruotsi'), ('rusaus'), ('rusina'), ('ruskaa'), ('ruskea'), ('ruskua'), ('rutata'), ('rutina'),
('ruuhka'), ('ruukki'), ('ruukku'), ('ruumen'), ('ruumis'), ('ruveta'), ('ryhtyä'), ('ryintä'), ('ryminä'), ('rymytä'),
('rynkky'), ('rynniä'), ('rynnäs'), ('rypäle'), ('ryskiä'), ('ryskyä'), ('ryskää'), ('ryssiä'), ('rysäys'), ('rytinä'),
('rytkyä'), ('ryyppy'), ('ryysis'), ('ryysiä'), ('ryytyä'), ('ryömiä'), ('ryöppy'), ('ryöstö'), ('rähinä'), ('rähmiä'),
('räikeä'), ('räikkä'), ('räikyä'), ('räikää'), ('räimiä'), ('räiske'), ('räkälä'), ('rälssi'), ('rämeys'), ('räminä'),
('rämpiä'), ('rämpsy'), ('rämäys'), ('räpsiä'), ('räpsyä'), ('räpylä'), ('räpätä'), ('räpäys'), ('räsäys'), ('rätinä'),
('rätkiä'), ('räyske'), ('räyskä'), ('räytyä'), ('rääkki'), ('rääkyä'), ('rääpiä'), ('röhinä'), ('röhkiä'), ('römeys');

-- Words starting with S
INSERT INTO finnish_words(word) VALUES
('saakka'), ('saalis'), ('saanne'), ('saanti'), ('saanto'), ('saapas'), ('saapua'), ('saarna'), ('saarni'), ('saarto'),
('saasta'), ('saaste'), ('saatto'), ('safari'), ('safkis'), ('sahata'), ('sahaus'), ('sahuri'), ('saikka'), ('saikku'),
('saippo'), ('sairas'), ('saitti'), ('saivar'), ('sakara'), ('sakata'), ('sakset'), ('saksia'), ('salaan'), ('salaki'),
('salama'), ('salami'), ('salata'), ('salaus'), ('salava'), ('salkku'), ('sallia'), ('saluki'), ('salvaa'), ('salvia'),
('salvoa'), ('salvos'), ('sameta'), ('sameus'), ('sammal'), ('sammas'), ('sammio'), ('sammua'), ('samoin'), ('samosa'),
('samota'), ('sampoo'), ('samuus'), ('sanelu'), ('sangen'), ('sankka'), ('sanoja'), ('sanoma'), ('saoste'), ('saparo'),
('sapeli'), ('sarake'), ('sarana'), ('sarjis'), ('sarjoa'), ('sarpio'), ('satama'), ('sattua'), ('satula'), ('saukko'),
('saundi'), ('saunio'), ('saunoa'), ('sauvoa'), ('savate'), ('saveta'), ('saveus'), ('savuke'), ('savuta'), ('scampi'),
('seassa'), ('seasta'), ('seepia'), ('seepra'), ('seesam'), ('seetri'), ('seikka'), ('seinus'), ('seipiö'), ('seiska'),
('seisoa'), ('seistä'), ('seitan'), ('seitti'), ('seiväs'), ('sekaan'), ('sekava'), ('sekeli'), ('seksti'), ('sektio'),
('sekuli'), ('selain'), ('selata'), ('selaus'), ('selfie'), ('selite'), ('selitä'), ('selkeä'), ('selkis'), ('selviö'),
('seläke'), ('sembra'), ('senior'), ('senkin'), ('senkka'), ('senkki'), ('sentti'), ('seoste'), ('sepeli'), ('sepite'),
('sepivä'), ('seppel'), ('sepsis'), ('serbia'), ('serkku'), ('serkus'), ('sessio'), ('sestoa'), ('seteli'), ('setviä'),
('seuloa'), ('seulos'), ('seurue'), ('seuruu'), ('sfääri'), ('shaali'), ('shaker'), ('shakki'), ('shandy'), ('sharon'),
('shekki'), ('sherpa'), ('sherry'), ('shinto'), ('shokki'), ('shotti'), ('sialma'), ('siellä'), ('sieltä'), ('siemen'),
('sieppo'), ('siesta'), ('sietää'), ('sifoni'), ('sihaus'), ('sihinä'), ('siihen'), ('siimes'), ('siinto'), ('siippa'),
('siirre'), ('siirto'), ('siisti'), ('siitin'), ('siitos'), ('sijata'), ('sijaus'), ('sikala'), ('sikana'), ('sikari'),
('sikeys'), ('sikisi'), ('sikiää'), ('siksak'), ('sikuna'), ('sikuri'), ('sikäli'), ('silata'), ('silaus'), ('silava'),
('siletä'), ('sileys'), ('silitä'), ('silkka'), ('silkki'), ('silkko'), ('silmus'), ('silote'), ('silpiä'), ('silpoa'),
('silppu'), ('siltti'), ('simona'), ('simppu'), ('single'), ('sinkki'), ('sinkku'), ('sintsi'), ('sintti'), ('sipata'),
('sipaus'), ('sipinä'), ('sipuli'), ('sirinä'), ('sirkeä'), ('sirkka'), ('sirkku'), ('sirkus'), ('sirota'), ('sirote'),
('sirppi'), ('sisali'), ('sisetä'), ('siskos'), ('sisään'), ('sitcom'), ('sitkas'), ('sitkeä'), ('sitoja'), ('sitomo'),
('sitova'), ('sitten'), ('sivari'), ('sively'), ('siveys'), ('sivuta'), ('sivuun'), ('skaala'), ('skandi'), ('skeema'),
('skeida'), ('sketsi'), ('skimba'), ('skisma'), ('skitsi'), ('skitso'), ('skitta'), ('skotti'), ('skraba'), ('skrapa'),
('slaagi'), ('slaavi'), ('slalom'), ('slangi'), ('slogan'), ('slotti'), ('slummi'), ('smokki'), ('snapsi'), ('soidin'),
('soihtu'), ('soikea'), ('soikio'), ('soikko'), ('soinen'), ('sointi'), ('sointu'), ('soitin'), ('soitto'), ('sojoon'),
('sokeri'), ('sokeus'), ('solidi'), ('solina'), ('soljua'), ('solmia'), ('solmio'), ('solttu'), ('somali'), ('somero'),
('sontia'), ('sontsa'), ('sopiva'), ('sopuli'), ('sorata'), ('soraus'), ('soreus'), ('sorina'), ('sorkka'), ('sormio'),
('sormus'), ('sorsia'), ('sortaa'), ('sortti'), ('sortua'), ('sotata'), ('sotija'), ('sotkea'), ('sotkos'), ('soturi'),
('soukka'), ('soundi'), ('soutaa'), ('sovite'), ('spammi'), ('spasmi'), ('speksi'), ('sperma'), ('spotti'), ('spurgu'),
('spämmi'), ('squash'), ('staagi'), ('staaki'), ('staalo'), ('staasi'), ('staili'), ('stallo'), ('standi'), ('status'),
('stemma'), ('steppi'), ('stereo'), ('stevia'), ('stigma'), ('stikki'), ('stoola'), ('stoori'), ('stoppi'), ('studio'),
('stukki'), ('stukko'), ('ständi'), ('sudoku'), ('suflee'), ('suhari'), ('suhata'), ('suhaus'), ('suhina'), ('suihke'),
('suihku'), ('suikea'), ('suikka'), ('suippo'), ('suippu'), ('suiste'), ('suisto'), ('sujaus'), ('sujuva'), ('suklaa'),
('suksee'), ('suksia'), ('sulake'), ('sulate'), ('sulava'), ('suljin'), ('sulkea'), ('sulkia'), ('sulloa'), ('sulous'),
('sulppu'), ('sulute'), ('sumeri'), ('sumeta'), ('sumeus'), ('sumppi'), ('sumppu'), ('sumuta'), ('sumute'), ('suntio'),
('suntis'), ('suntti'), ('suodin'), ('suodos'), ('suojus'), ('suomia'), ('suomus'), ('suopea'), ('suopua'), ('suoria'),
('suosia'), ('suosio'), ('suotaa'), ('suotta'), ('supata'), ('supeta'), ('supina'), ('suppea'), ('sureva'), ('surina'),
('surkea'), ('survin'), ('survoa'), ('survos'), ('sutata'), ('sutina'), ('suukko'), ('suulas'), ('suunta'), ('suuosa'),
('suurus'), ('suutia'), ('suutin'), ('suviyö'), ('sveedu'), ('svengi'), ('svingi'), ('syaani'), ('sydäri'), ('syherö'),
('syinen'), ('sykerö'), ('sykkiä'), ('sykkää'), ('sykäys'), ('sylkeä'), ('sylkky'), ('syltty'), ('synkeä'), ('synkkä'),
('synodi'), ('syntyä'), ('syrjiä'), ('sysätä'), ('sysäys'), ('syttyä'), ('sytyke'), ('syvetä'), ('syvyys'), ('syväys'),
('syvään'), ('syyhyä'), ('syypää'), ('syytää'), ('syytön'), ('syytös'), ('syöksy'), ('syönti'), ('syöppö'), ('syöpyä'),
('syöstä'), ('syötin'), ('syötti'), ('syöttö'), ('syötös'), ('sähinä'), ('sähliä'), ('säihke'), ('säikky'), ('säiliö'),
('säilyä'), ('säilöä'), ('säkene'), ('säpinä'), ('säpäle'), ('särinä'), ('särkeä'), ('särkkä'), ('särkyä'), ('särmiö'),
('särpiä'), ('särvin'), ('säteri'), ('sätkin'), ('sätkiä'), ('sättiä'), ('sävyte'), ('säväri'), ('säväys'), ('säyseä'),
('säädin'), ('säädös'), ('sääksi'), ('sääliä'), ('sääntö'), ('säärys'), ('sääski'), ('säästö'), ('säätiö'), ('säätyä'),
('säätää'), ('söhliä'), ('söhriä'), ('sönkkö'), ('sössiä'), ('söötti');

-- Words starting with T
INSERT INTO finnish_words(word) VALUES
('taakka'), ('taakse'), ('taamma'), ('taasen'), ('taatto'), ('taattu'), ('taemma'), ('taempi'), ('tagata'), ('tagine'),
('tahdas'), ('tahina'), ('tahine'), ('tahini'), ('tahmea'), ('tahria'), ('tahtoa'), ('taikka'), ('taikoa'), ('taimen'),
('taimia'), ('taipua'), ('taisto'), ('taitaa'), ('taiten'), ('taitos'), ('taitse'), ('taitto'), ('taival'), ('taivas'),
('tajine'), ('tajuta'), ('takana'), ('takaus'), ('takila'), ('takini'), ('takoja'), ('takomo'), ('taksia'), ('takuta'),
('talari'), ('talkki'), ('talkoo'), ('talloa'), ('talmud'), ('talous'), ('talsia'), ('taltio'), ('taltta'), ('talvio'),
('tamili'), ('tamppi'), ('tanaan'), ('tandem'), ('tangat'), ('tanhua'), ('tankea'), ('tankio'), ('tankki'), ('tanner'),
('tanska'), ('tanssi'), ('tantra'), ('tantta'), ('tantti'), ('taonta'), ('tapani'), ('tapaus'), ('tappaa'), ('tappio'),
('tapuli'), ('tarina'), ('tarita'), ('tarkka'), ('tarpoa'), ('tarvis'), ('tasaan'), ('tasain'), ('tasata'), ('tasaus'),
('tasuri'), ('tatami'), ('tatska'), ('tattis'), ('tauhka'), ('taukki'), ('tauota'), ('tausta'), ('tautta'), ('tavara'),
('tavata'), ('tavoin'), ('teelmä'), ('teetto'), ('teevee'), ('teflon'), ('tehdas'), ('tehota'), ('tehote'), ('teiini'),
('teikki'), ('teippi'), ('teismi'), ('teisti'), ('teitse'), ('tekele'), ('tekevä'), ('tekijä'), ('teksti'), ('telata'),
('teline'), ('telkka'), ('telkku'), ('telkkä'), ('telmiä'), ('telmää'), ('teltta'), ('tempoa'), ('temppu'), ('tempus'),
('tenava'), ('tennis'), ('tenori'), ('tensio'), ('tentti'), ('tenttu'), ('tenätä'), ('teoria'), ('tepsiä'), ('terkka'),
('terkut'), ('termos'), ('terska'), ('terssi'), ('terttu'), ('tervas'), ('terävä'), ('teuras'), ('texmex'), ('theeta'),
('thorax'), ('tiaara'), ('tiehyt'), ('tienoo'), ('tieosa'), ('tiestö'), ('tieten'), ('tietty'), ('tietue'), ('tietyö'),
('tietää'), ('tietön'), ('tihetä'), ('tiheys'), ('tihkua'), ('tiibet'), ('tiikki'), ('tiipii'), ('tiivis'), ('tiiviö'),
('tikari'), ('tikata'), ('tilata'), ('tilaus'), ('tilava'), ('tilkka'), ('tilkku'), ('tilsit'), ('timali'), ('tinata'),
('tinaus'), ('tinkiä'), ('tintti'), ('tipata'), ('tippua'), ('tiptop'), ('tiraus'), ('tirppa'), ('tirsat'), ('tirsua'),
('tisuri'), ('tiukka'), ('tivata'), ('tivoli'), ('todeta'), ('toffee'), ('tohelo'), ('tohina'), ('tohtia'), ('toimia'),
('toinen'), ('toipua'), ('toisin'), ('toissa'), ('toiste'), ('toisto'), ('toivoa'), ('tokaji'), ('tolkku'), ('tolppa'),
('tomera'), ('tomtom'), ('tomuta'), ('tongit'), ('tonkia'), ('tonkka'), ('tontti'), ('tonttu'), ('topata'), ('toppis'),
('torero'), ('torium'), ('torjua'), ('torkku'), ('torppa'), ('torsio'), ('torttu'), ('tosite'), ('toteen'), ('totota'),
('tottua'), ('totuus'), ('toukka'), ('toveri'), ('traani'), ('tralli'), ('trance'), ('tratta'), ('tratti'), ('trauma'),
('treema'), ('treeni'), ('trendi'), ('trifle'), ('trikki'), ('trikoo'), ('trilli'), ('trioli'), ('tripla'), ('trippi'),
('trivia'), ('trofee'), ('trokee'), ('trolli'), ('trombi'), ('trooli'), ('troppi'), ('trukki'), ('trulli'), ('trusti'),
('tsaari'), ('tsuhna'), ('tsätti'), ('tuenta'), ('tuhaus'), ('tuhina'), ('tuhkis'), ('tuhota'), ('tuhria'), ('tuikea'),
('tuikku'), ('tuiske'), ('tuisku'), ('tujaus'), ('tukala'), ('tuketa'), ('tukeva'), ('tukija'), ('tukkia'), ('tulema'),
('tuleva'), ('tulija'), ('tulite'), ('tulkka'), ('tulkki'), ('tulppa'), ('tulvia'), ('tumake'), ('tummua'), ('tumppi'),
('tumppu'), ('tunari'), ('tundra'), ('tungos'), ('tunika'), ('tunkea'), ('tunkio'), ('tunkki'), ('tunnus'), ('tuntea'),
('tuntua'), ('tuohia'), ('tuohon'), ('tuohus'), ('tuokio'), ('tuoksu'), ('tuolla'), ('tuolta'), ('tuomas'), ('tuomio'),
('tuonne'), ('tuonti'), ('tuoppi'), ('tuossa'), ('tuosta'), ('tuotos'), ('tuotto'), ('tupata'), ('turina'), ('turkis'),
('turkki'), ('turmio'), ('turnee'), ('turpea'), ('tursas'), ('turska'), ('turski'), ('tursua'), ('turtua'), ('turvin'),
('tusina'), ('tuskin'), ('tutina'), ('tutkia'), ('tuuhea'), ('tuulas'), ('tuulla'), ('tuumia'), ('tuurna'), ('tuusan'),
('tuutia'), ('tuutti'), ('tuutua'), ('tvilli'), ('tvisti'), ('twisti'), ('tyhjiö'), ('tykätä'), ('tykönä'), ('tylppä'),
('tylsyä'), ('tylyys'), ('tympeä'), ('tympiä'), ('typerä'), ('tyrkky'), ('tyrske'), ('tyrsky'), ('tyräys'), ('tytinä'),
('tyvetä'), ('tyveys'), ('tyyfus'), ('tyynni'), ('tyyppi'), ('tyyris'), ('tyyten'), ('tyytyä'), ('työala'), ('työapu'),
('työase'), ('työasu'), ('työikä'), ('työläs'), ('työmaa'), ('työntö'), ('työstö'), ('työtön'), ('työura'), ('tädyke'),
('tägätä'), ('tähden'), ('tähkiä'), ('tähkiö'), ('tähytä'), ('täkänä'), ('tänään'), ('täpärä'), ('tärinä'), ('tärkeä'),
('tärkki'), ('tärppi'), ('tärsky'), ('täräys'), ('täynnä'), ('täysin'), ('täyttö'), ('täytyä'), ('täällä'), ('täältä'),
('töhriä'), ('tökerö'), ('tökkiä'), ('tökätä'), ('tölkki'), ('töltti'), ('tölviä'), ('töminä'), ('tömäys'), ('tönkkö'),
('töpinä'), ('töpätä'), ('törkeä'), ('törppö'), ('törttö'), ('töräys'), ('töröön'), ('töyhtö'), ('töykeä'), ('töyräs'),
('töyssy'), ('töötti');

-- Words starting with U
INSERT INTO finnish_words(word) VALUES
('udella'), ('ufoilu'), ('uhalla'), ('uhkaus'), ('uhkeus'), ('uhmata'), ('uhrata'), ('uhraus'), ('uimala'), ('uimari'), 
('uimuri'), ('uistaa'), ('uistin'), ('uittaa'), ('uivelo'), ('ujoilu'), ('ujosti'), ('ujutus'), ('ukaasi'), ('ukkeli'), 
('ulappa'), ('ulista'), ('uljaus'), ('uljuus'), ('ulkona'), ('ulolle'), ('ulolta'), ('ulompi'), ('uloste'), ('umpeen'), 
('unelma'), ('uneton'), ('unhola'), ('uniasu'), ('unikko'), ('uninen'), ('unioni'), ('unisex'), ('unityö'), ('unkari'), 
('untelo'), ('untuva'), ('upokas'), ('upotus'), ('uraani'), ('urakka'), ('urheus'), ('urista'), ('uritus'), ('urjeta'), 
('urkkia'), ('urkuri'), ('urotyö'), ('uskova'), ('usutus'), ('utopia'), ('uurros'), ('uurtaa'), ('uusija'), ('uuttaa'), 
('uutuus'), ('uuvana');

-- Words starting with V
INSERT INTO finnish_words(word) VALUES
('vaadin'), ('vaahto'), ('vaaita'), ('vaaksa'), ('vaalea'), ('vaalia'), ('vaania'), ('vaappu'), ('vaarin'), ('vaarna'),
('vaarua'), ('vaatia'), ('vagina'), ('vahata'), ('vahaus'), ('vahtia'), ('vaieta'), ('vaihde'), ('vaihto'), ('vaikea'),
('vaikka'), ('vaikku'), ('vailla'), ('vaille'), ('vaimea'), ('vainaa'), ('vainen'), ('vainio'), ('vaippa'), ('vaipua'),
('vaisto'), ('vajaus'), ('vajava'), ('vajeta'), ('vajota'), ('vakain'), ('vakaus'), ('vakava'), ('vakuus'), ('valaja'),
('valelu'), ('validi'), ('valimo'), ('valita'), ('valkea'), ('valkki'), ('vallan'), ('valmis'), ('valpas'), ('valssi'),
('valtio'), ('valtti'), ('valuma'), ('valvoa'), ('vamppi'), ('vanamo'), ('vaneri'), ('vanhin'), ('vanhus'), ('vankka'),
('vannas'), ('vannoa'), ('vantti'), ('vanttu'), ('vantus'), ('vapari'), ('vapaus'), ('vapina'), ('vapiti'), ('varaan'),
('varata'), ('varaus'), ('varhin'), ('varoke'), ('varova'), ('varpio'), ('varppi'), ('varras'), ('varsin'), ('varsoa'),
('varsta'), ('varten'), ('vartio'), ('vartoa'), ('vartti'), ('varvas'), ('vasama'), ('vasara'), ('vastas'), ('vasten'),
('vastin'), ('vastoa'), ('vastus'), ('vastuu'), ('vasuri'), ('vatvoa'), ('vauhko'), ('vauhti'), ('vauras'), ('vaurio'),
('vautsi'), ('vedike'), ('vedota'), ('vehmas'), ('vehreä'), ('veikeä'), ('veikka'), ('veikko'), ('veisto'), ('veisuu'),
('veitsi'), ('vekara'), ('vekata'), ('veljes'), ('velkoa'), ('velloa'), ('veltto'), ('vemmel'), ('venata'), ('ventti'),
('venyke'), ('venymä'), ('venäjä'), ('verevä'), ('verhiö'), ('verkko'), ('verran'), ('versio'), ('versoa'), ('versus'),
('vertyä'), ('veruke'), ('veräjä'), ('vesata'), ('vesaus'), ('vesper'), ('vesuri'), ('vetely'), ('vetelä'), ('vetreä'),
('vettyä'), ('veturi'), ('vetäjä'), ('vetävä'), ('viaton'), ('viehko'), ('viekas'), ('vienti'), ('vieras'), ('vieriä'),
('vieroa'), ('vierre'), ('vierus'), ('viesti'), ('vietti'), ('vietto'), ('vihata'), ('vihdas'), ('vihkiä'), ('vihloa'),
('vihmin'), ('vihmoa'), ('vihreä'), ('vihtoa'), ('vihuri'), ('viides'), ('viihde'), ('viikko'), ('viiksi'), ('viileä'),
('viille'), ('viilto'), ('viipyä'), ('viisas'), ('viiste'), ('viisto'), ('viitta'), ('vikinä'), ('vikuri'), ('vilaus'),
('vilinä'), ('vilkas'), ('vilkku'), ('vilpas'), ('vilppi'), ('vilske'), ('viltti'), ('vimppa'), ('vinkeä'), ('vinkki'),
('vinkua'), ('vinoon'), ('vinous'), ('vinssi'), ('vintiö'), ('vintti'), ('vipata'), ('vipinä'), ('vireys'), ('virike'),
('viritä'), ('virkeä'), ('virkku'), ('virota'), ('virpoa'), ('virsta'), ('virtsa'), ('viskoa'), ('vitsas'), ('vitsoa'),
('viuhka'), ('viuhke'), ('viuhko'), ('viuhua'), ('vivace'), ('vivuta'), ('voguli'), ('vohkia'), ('voihke'), ('voikka'),
('voikko'), ('voilee'), ('voinen'), ('vointi'), ('voipua'), ('voipuu'), ('voitto'), ('vokata'), ('voltti'), ('vonkua'),
('voodoo'), ('vrappi'), ('vräppi'), ('vuokko'), ('vuokra'), ('vuoksi'), ('vuolas'), ('vuolla'), ('vuolle'), ('vuonia'),
('vuonna'), ('vuotaa'), ('vyyhti'), ('vyökoe'), ('vyöryä'), ('vyötön'), ('väekäs'), ('väestö'), ('väetön'), ('vähetä'),
('vähiin'), ('vähyys'), ('väijyä'), ('väistö'), ('väitös'), ('väkevä'), ('väliin'), ('välike'), ('väline'), ('välkky'),
('välkkä'), ('vällyt'), ('välppä'), ('välttö'), ('väläys'), ('väninä'), ('vänskä'), ('värinä'), ('värjyä'), ('värkki'),
('värssy'), ('väsätä'), ('väsäys'), ('väänne'), ('vääntö'), ('väärin'), ('väärti');

-- Words starting with W
INSERT INTO finnish_words(word) VALUES
('wasabi'), ('whisky'), ('wigwam'), ('wokata'), ('wonton');

-- Words starting with X
-- No words

-- Words starting with Y
INSERT INTO finnish_words(word) VALUES
('yhdetä'), ('yhteen'), ('yhteys'), ('yhtymä'), ('yhtälö'), ('yhtään'), ('ykseys'), ('yksiin'), ('yksilö'), ('yleisö'), 
('ylemmä'), ('ylempi'), ('yletön'), ('yliajo'), ('ylimmä'), ('ylimys'), ('ylinen'), ('yliote'), ('yliset'), ('ylitse'), 
('ylitys'), ('ylityö'), ('yllyke'), ('ylpeys'), ('ylväys'), ('yläkuu'), ('ylämaa'), ('ylänkö'), ('ylänne'), ('yläosa'), 
('yläpää'), ('ympyrä'), ('ympäri'), ('ympätä'), ('ynistä'), ('ynnätä'), ('ynnäys'), ('ynseys'), ('yritys'), ('yrjötä'), 
('yrmeys'), ('yskinä'), ('ystävä'), ('yöaika'), ('yöilma'), ('yöjuna'), ('yökätä'), ('yölepo'), ('yömaja'), ('yönäkö'), 
('yöpala'), ('yöpuku'), ('yöpyjä'), ('yösija');

-- Words starting with Z
-- No words

-- Words starting with Å
-- No words

-- Words starting with Ä
INSERT INTO finnish_words(word) VALUES
('äestys'), ('äestää'), ('ähistä'), ('ähkinä'), ('ährätä'), ('äitelä'), ('äitiys'), ('äityli'), ('äkisti'), ('äksyys'), 
('äksöni'), ('äkäily'), ('äkämys'), ('älistä'), ('älköön'), ('älkööt'), ('älykkö'), ('älykäs'), ('älypää'), ('älytys'), 
('älytön'), ('äläkkä'), ('ämpäri'), ('ängetä'), ('änkyrä'), ('änkätä'), ('äristä'), ('ärsyke'), ('ärtymä'), ('äyskiä'), 
('ääneen'), ('ääneti'), ('äänite'), ('ääntiö'), ('ääntyä'), ('ääntää'), ('ääreen'), ('äärevä');

-- Words starting with Ö
INSERT INTO finnish_words(word) VALUES
('ödeema'), ('ökyily'), ('ölistä'), ('öljytä'), ('öristä'), ('ötökkä');