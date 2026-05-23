-- Original data from Kotus (CC BY 4.0): https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/nykysuomen-sana-aineistot/nykysuomen-sanalista/
-- Modified to fit this project's needs:
--      1) removed all words with fewer or more than 4 letters
--      2) removed words with diacritics (i.e. é,  è,  š)    
--      3) removed words ending in or including '-' (i.e. sika-)
--      4) removed derogatory words
--      5) removed words with a space in between (i.e. "au pair")

DELETE FROM finnish_words WHERE LENGTH(word) = 4;

-- Words starting with A
INSERT INTO finnish_words(word) VALUES
('aamu'), ('aapa'), ('aari'), ('aasi'), ('aate'), ('aava'), ('aave'), ('afro'), ('afta'), ('agar'),
('ahaa'), ('ahde'), ('ahjo'), ('ahma'), ('ahne'), ('ahti'), ('aids'), ('aihe'), ('aika'), ('aimo'),
('aina'), ('aine'), ('aino'), ('ainu'), ('airo'), ('aisa'), ('aita'), ('aito'), ('aivo'), ('ajaa'),
('ajos'), ('akka'), ('akku'), ('akne'), ('akti'), ('alas'), ('alba'), ('alfa'), ('alho'), ('alin'),
('alio'), ('alku'), ('alla'), ('alle'), ('alli'), ('almu'), ('alpi'), ('alta'), ('alue'), ('alun'),
('alus'), ('alvi'), ('amis'), ('amme'), ('ammu'), ('amok'), ('ampu'), ('anis'), ('anoa'), ('ansa'),
('anti'), ('anto'), ('anus'), ('apea'), ('appi'), ('apro'), ('apsi'), ('arho'), ('arka'), ('arki'),
('armo'), ('arpa'), ('arpi'), ('arvo'), ('asia'), ('aski'), ('aspi'), ('aste'), ('asti'), ('asua'),
('auer'), ('auki'), ('aula'), ('auma'), ('aura'), ('auto'), ('auts'), ('auvo'), ('avec'), ('avio');

-- Words starting with B
INSERT INTO finnish_words(word) VALUES
('baba'), ('baby'), ('beat'), ('bebe'), ('blaa'), ('bodi'), ('body'), ('brie'), ('budo'), ('bugi'),
('busa'), ('buto'), ('byte');

-- Words starting with C
INSERT INTO finnish_words(word) VALUES
('camp'), ('case'), ('cava'), ('chat'), ('chia'), ('chic'), ('city'), ('clou'), ('cola'), ('cool'),
('copy');

-- Words starting with D
INSERT INTO finnish_words(word) VALUES
('dada'), ('dari'), ('data'), ('degu'), ('deli'), ('demo'), ('desi'), ('dino'), ('doku'), ('dödö'),
('dösä');

-- Words starting with E
INSERT INTO finnish_words(word) VALUES
('edam'), ('edes'), ('edus'), ('eeva'), ('ehei'), ('eheä'), ('ehiö'), ('ehjä'), ('ehkä'), ('ehta'),
('ehto'), ('ehyt'), ('eikä'), ('eine'), ('eioo'), ('eksä'), ('elin'), ('eliö'), ('elje'), ('elää'),
('emiö'), ('emäs'), ('enin'), ('enne'), ('ensi'), ('entä'), ('enää'), ('epis'), ('epuu'), ('erhe'),
('eriö'), ('ersä'), ('eräs'), ('essu'), ('este'), ('esto'), ('etoa'), ('että'), ('euro'), ('eväs');

-- Words starting with F
INSERT INTO finnish_words(word) VALUES
('fade'), ('fado'), ('fani'), ('feta'), ('fiba'), ('file'), ('fisu'), ('flow'), ('folk'), ('foto'),
('funk'), ('föhn');

-- Words starting with G
INSERT INTO finnish_words(word) VALUES
('gari'), ('gini'), ('gnuu'), ('golf'), ('gray'), ('guru');

-- Words starting with H
INSERT INTO finnish_words(word) VALUES
('haje'), ('haju'), ('haka'), ('hake'), ('hako'), ('haku'), ('hali'), ('halo'), ('halu'), ('hame'),
('hana'), ('hara'), ('havu'), ('hede'), ('hela'), ('hele'), ('helo'), ('hely'), ('hepo'), ('hera'),
('hete'), ('heti'), ('hetu'), ('hevi'), ('hifi'), ('hiha'), ('hiki'), ('hila'), ('hile'), ('hima'),
('himo'), ('hioa'), ('hitu'), ('hiue'), ('hius'), ('hoki'), ('hoku'), ('home'), ('homo'), ('hosa'),
('hovi'), ('huhu'), ('huit'), ('huki'), ('hula'), ('humu'), ('huoh'), ('hupa'), ('hupi'), ('huti'),
('hutu'), ('huut'), ('huvi'), ('hymy'), ('hynä'), ('hype'), ('hyve'), ('hyvä'), ('häjy'), ('häkä'),
('häly'), ('hämy'), ('häpy'), ('härö'), ('hätä'), ('häät'), ('hölö'), ('hönö'), ('höpö'), ('hötö');

-- Words starting with I
INSERT INTO finnish_words(word) VALUES
('idea'), ('idis'), ('iglu'), ('ihaa'), ('ihan'), ('ihka'), ('ihku'), ('ihme'), ('ihra'), ('iiri'),
('iisi'), ('ilki'), ('ilma'), ('ilme'), ('ilmi'), ('ilta'), ('ilve'), ('imeä'), ('impi'), ('info'),
('inha'), ('inho'), ('inka'), ('into'), ('ioni'), ('irti'), ('isku'), ('iskä'), ('ismi'), ('itiö'),
('itku'), ('itse'), ('itää'), ('iäti'), ('iätä');

-- Words starting with J
INSERT INTO finnish_words(word) VALUES
('jade'), ('jaha'), ('jako'), ('jalo'), ('jana'), ('jang'), ('jano'), ('jaos'), ('jata'), ('jazz'),
('jees'), ('jehu'), ('jeni'), ('jess'), ('jeti'), ('jigi'), ('jive'), ('jodi'), ('jojo'), ('joka'),
('joki'), ('joko'), ('joku'), ('joni'), ('jono'), ('jopa'), ('jopi'), ('joro'), ('jota'), ('juan'),
('judo'), ('juju'), ('juku'), ('jumi'), ('juna'), ('juro'), ('jury'), ('just'), ('jute'), ('jyly'),
('jymy'), ('jyry'), ('jyrä'), ('jyty'), ('jytä'), ('jyvä'), ('jäbä'), ('jäde'), ('jämä'), ('jänö'),
('jäte'), ('jörö');

-- Words starting with K
INSERT INTO finnish_words(word) VALUES
('kade'), ('kait'), ('kaje'), ('kajo'), ('kaki'), ('kaks'), ('kala'), ('kale'), ('kali'), ('kalu'),
('kama'), ('kamu'), ('kana'), ('kani'), ('kapi'), ('kara'), ('kare'), ('kari'), ('karu'), ('kasa'),
('kasi'), ('kate'), ('kato'), ('katu'), ('keho'), ('kehu'), ('kehä'), ('keko'), ('kela'), ('keli'),
('kelo'), ('kera'), ('kero'), ('kerä'), ('kesy'), ('kesä'), ('keto'), ('ketä'), ('khat'), ('khii'),
('khoi'), ('kide'), ('kiho'), ('kihu'), ('kili'), ('kilo'), ('kilu'), ('kimo'), ('kina'), ('kino'),
('kipa'), ('kipu'), ('kiri'), ('kiro'), ('kisa'), ('kisu'), ('kita'), ('kiva'), ('kivi'), ('kiwi'),
('koho'), ('kohu'), ('koje'), ('koju'), ('koko'), ('kola'), ('kolo'), ('komi'), ('kone'), ('koni'),
('kori'), ('koru'), ('kota'), ('koti'), ('koto'), ('kova'), ('kude'), ('kuha'), ('kuin'), ('kuja'),
('kuje'), ('kuka'), ('kuli'), ('kulo'), ('kulu'), ('kumi'), ('kumu'), ('kuna'), ('kupo'), ('kupu'),
('kura'), ('kure'), ('kuri'), ('kuru'), ('kusi'), ('kuta'), ('kuti'), ('kutu'), ('kuva'), ('kuve'),
('kyky'), ('kyly'), ('kylä'), ('kymi'), ('kynä'), ('kyse'), ('kyty'), ('kytö'), ('käki'), ('käkö'),
('käly'), ('känä'), ('käpy'), ('käry'), ('käsi'), ('kääk'), ('köhä'), ('köli');

-- Words starting with L
INSERT INTO finnish_words(word) VALUES
('lady'), ('laho'), ('lain'), ('laji'), ('laki'), ('lako'), ('laku'), ('lama'), ('lana'), ('lapa'),
('lape'), ('lari'), ('lasi'), ('lata'), ('lati'), ('lato'), ('latu'), ('lava'), ('ledi'), ('leka'),
('lelu'), ('lemu'), ('lepo'), ('lese'), ('leso'), ('levy'), ('levä'), ('lied'), ('liha'), ('lika'),
('liki'), ('lila'), ('lima'), ('lime'), ('limu'), ('lino'), ('liri'), ('liro'), ('liru'), ('lisä'),
('liti'), ('lito'), ('litu'), ('live'), ('logo'), ('lohi'), ('loka'), ('loki'), ('loma'), ('look'),
('loru'), ('lovi'), ('lude'), ('lues'), ('luha'), ('luja'), ('luku'), ('lume'), ('lumi'), ('lumo'),
('lupa'), ('luti'), ('lyly'), ('läjä'), ('läpi'), ('läsi'), ('lääh'), ('löpö');

-- Words starting with M
INSERT INTO finnish_words(word) VALUES
('maar'), ('made'), ('maha'), ('maho'), ('main'), ('maja'), ('maki'), ('maku'), ('mali'), ('mamu'),
('mana'), ('mani'), ('manu'), ('mari'), ('mars'), ('masi'), ('masu'), ('mate'), ('mato'), ('maya'),
('mehu'), ('mela'), ('melu'), ('meno'), ('menu'), ('meri'), ('mers'), ('mesi'), ('mesu'), ('meze'),
('miau'), ('midi'), ('mies'), ('mikä'), ('mini'), ('minä'), ('miso'), ('miss'), ('misu'), ('mitä'),
('moka'), ('molo'), ('moni'), ('mono'), ('mopo'), ('moro'), ('moto'), ('mude'), ('muka'), ('muki'),
('muli'), ('muna'), ('mura'), ('muro'), ('muru'), ('musa'), ('must'), ('muta'), ('mutu'), ('myky'),
('myös'), ('mäki'), ('mäsä'), ('mäti'), ('mätä'), ('mökä'), ('möly');

-- Words starting with N
INSERT INTO finnish_words(word) VALUES
('naku'), ('nami'), ('namu'), ('napa'), ('naru'), ('nasu'), ('nata'), ('nato'), ('nega'), ('neli'),
('nenu'), ('nenä'), ('neon'), ('nero'), ('neva'), ('nide'), ('niin'), ('nila'), ('nili'), ('nimi'),
('nipo'), ('nisu'), ('nisä'), ('niva'), ('noin'), ('noja'), ('noki'), ('nolo'), ('nori'), ('noro'),
('nova'), ('nude'), ('nuha'), ('nupi'), ('nupo'), ('nupu'), ('nuti'), ('nysä'), ('näes'), ('näet'),
('näin'), ('näky'), ('näkö'), ('nämä'), ('näpy'), ('näre'), ('närä'), ('nääs'), ('näät');

-- Words starting with O
INSERT INTO finnish_words(word) VALUES
('oboe'), ('ohja'), ('ohje'), ('ohmi'), ('ohoh'), ('ohoi'), ('ohra'), ('ohut'), ('oire'), ('oiva'),
('okei'), ('okra'), ('oksa'), ('olas'), ('olio'), ('olka'), ('olki'), ('olla'), ('olmi'), ('olut'),
('olvi'), ('omia'), ('onki'), ('onni'), ('oodi'), ('opas'), ('oppi'), ('opus'), ('oras'), ('orhi'),
('orja'), ('orpo'), ('orsi'), ('osin'), ('osio'), ('ossi'), ('osto'), ('osua'), ('otin'), ('otos'),
('otsa'), ('otso'), ('otto'), ('otus'), ('outo'), ('ouzo');

-- Words starting with P
INSERT INTO finnish_words(word) VALUES
('paha'), ('pahe'), ('paja'), ('paju'), ('pako'), ('paku'), ('pala'), ('palo'), ('pano'), ('papu'),
('para'), ('pari'), ('pata'), ('pato'), ('patu'), ('peli'), ('peni'), ('peru'), ('perä'), ('peso'),
('pesu'), ('pesä'), ('peti'), ('peto'), ('phui'), ('phyi'), ('pian'), ('piha'), ('pihi'), ('piip'),
('piki'), ('pila'), ('pili'), ('pimu'), ('pino'), ('pipi'), ('pipo'), ('piri'), ('piru'), ('pisi'),
('pisu'), ('pita'), ('pito'), ('pivo'), ('plus'), ('pois'), ('poju'), ('poka'), ('pola'), ('poli'),
('polo'), ('pomo'), ('poni'), ('popo'), ('pora'), ('pore'), ('poro'), ('poru'), ('pose'), ('povi'),
('pubi'), ('puhe'), ('puin'), ('pujo'), ('puku'), ('pula'), ('puli'), ('pulu'), ('puna'), ('pune'),
('punk'), ('pupu'), ('pure'), ('puro'), ('puru'), ('pusi'), ('pusu'), ('puuh'), ('pyhä'), ('pykä'),
('pyre'), ('pyry'), ('päin'), ('päre'), ('pöhö'), ('pöly'), ('pöpi'), ('pöpö'), ('pösö'), ('pöty');

-- Words starting with Q
-- No words

-- Words starting with R
INSERT INTO finnish_words(word) VALUES
('raha'), ('rahi'), ('raja'), ('raju'), ('raki'), ('rako'), ('rami'), ('rapa'), ('rapu'), ('rasi'),
('rata'), ('ravi'), ('redi'), ('rehu'), ('reki'), ('rela'), ('rele'), ('remu'), ('repo'), ('resu'),
('reti'), ('rial'), ('riff'), ('rike'), ('riki'), ('rima'), ('ripa'), ('ripe'), ('risa'), ('risu'),
('rita'), ('rivi'), ('rivo'), ('robo'), ('rock'), ('roju'), ('romu'), ('ropo'), ('roso'), ('roti'),
('rotu'), ('roux'), ('rove'), ('ruho'), ('ruis'), ('rujo'), ('ruko'), ('ruma'), ('runo'), ('rupi'),
('ruso'), ('rymy'), ('rysy'), ('rysä'), ('ryti'), ('rytö'), ('räkä'), ('räme'), ('rämä'), ('räsy');

-- Words starting with S
INSERT INTO finnish_words(word) VALUES
('sade'), ('saha'), ('sahe'), ('sahi'), ('saju'), ('sake'), ('saku'), ('sala'), ('sali'), ('salo'),
('sama'), ('sana'), ('sane'), ('sani'), ('saos'), ('sara'), ('sari'), ('sars'), ('sata'), ('sato'),
('satu'), ('savi'), ('savo'), ('savu'), ('sees'), ('seis'), ('sekä'), ('semi'), ('seos'), ('seto'),
('setu'), ('setä'), ('shop'), ('shot'), ('show'), ('sial'), ('side'), ('siis'), ('sija'), ('sika'),
('sima'), ('sini'), ('sinä'), ('siro'), ('siru'), ('sisu'), ('sitä'), ('sivu'), ('skyr'), ('smog'),
('sola'), ('solu'), ('soma'), ('some'), ('sopa'), ('sopu'), ('sora'), ('sori'), ('sose'), ('sota'),
('sote'), ('sotu'), ('soul'), ('stop'), ('suht'), ('suka'), ('suku'), ('sula'), ('sulo'), ('suma'),
('sumo'), ('sumu'), ('supi'), ('supo'), ('suru'), ('susi'), ('suti'), ('suvi'), ('swap'), ('syke'),
('syli'), ('sysi'), ('syvä'), ('syys'), ('säbä'), ('säde'), ('säen'), ('säie'), ('säkä'), ('säle'),
('säly'), ('sälä'), ('sälö'), ('särä'), ('särö'), ('sävy'), ('söde'), ('sökö'), ('söpö');

-- Words starting with T
INSERT INTO finnish_words(word) VALUES
('taas'), ('tabu'), ('taco'), ('tagi'), ('tahi'), ('taho'), ('tain'), ('taju'), ('taka'), ('tali'),
('talo'), ('tanu'), ('taos'), ('tapa'), ('taru'), ('tase'), ('taso'), ('taus'), ('tavi'), ('tavu'),
('teak'), ('teho'), ('teko'), ('teku'), ('tela'), ('tele'), ('teli'), ('tenu'), ('tenä'), ('teos'),
('tere'), ('terä'), ('thai'), ('ties'), ('tifo'), ('tihu'), ('tila'), ('tili'), ('tina'), ('tipi'),
('tipu'), ('tisu'), ('tjaa'), ('tofu'), ('toga'), ('toka'), ('toki'), ('tola'), ('tomu'), ('tora'),
('tori'), ('tosi'), ('toti'), ('toto'), ('tovi'), ('trap'), ('trio'), ('tsot'), ('tubi'), ('tuho'),
('tuju'), ('tuke'), ('tuki'), ('tuku'), ('tuli'), ('tulo'), ('tuma'), ('tupa'), ('tupo'), ('turo'),
('tuta'), ('tutu'), ('tuut'), ('tykö'), ('tyly'), ('typo'), ('typy'), ('tyrä'), ('tyvi'), ('tyyt'),
('tägi'), ('täky'), ('tämä'), ('täry'), ('täti'), ('tönö'), ('töpö'), ('törö'), ('tööt');

-- Words starting with U
INSERT INTO finnish_words(word) VALUES
('udar'), ('uhka'), ('uhku'), ('uhma'), ('uhri'), ('uida'), ('uija'), ('uiva'), ('ujua'), ('ukki'),
('ukko'), ('uksi'), ('ulko'), ('ulos'), ('umpi'), ('umpu'), ('unho'), ('uoma'), ('upea'), ('urdu'),
('urea'), ('urho'), ('urku'), ('uros'), ('urpo'), ('urpu'), ('urut'), ('usea'), ('usko'), ('ussa'),
('usva'), ('uuhi'), ('uuma'), ('uuni'), ('uuno'), ('uusi'), ('uute');

-- Words starting with V
INSERT INTO finnish_words(word) VALUES
('vaan'), ('vadi'), ('vaha'), ('vain'), ('vaja'), ('vaje'), ('vaka'), ('vako'), ('vala'), ('vale'),
('valo'), ('valu'), ('vana'), ('vanu'), ('vapa'), ('vara'), ('vari'), ('vasa'), ('vasu'), ('vati'),
('vege'), ('veke'), ('veks'), ('veli'), ('vene'), ('veri'), ('vero'), ('vesa'), ('vesi'), ('veto'),
('vety'), ('wifi'), ('viha'), ('vihi'), ('viis'), ('vika'), ('wiki'), ('vilu'), ('vino'), ('vipu'),
('vire'), ('viri'), ('viro'), ('visa'), ('visu'), ('vita'), ('viti'), ('viuh'), ('voda'), ('voro'),
('vosu'), ('vähä'), ('väki'), ('väkä'), ('väli'), ('väre'), ('väri'), ('väsy'), ('vävy');

-- Words starting with W
INSERT INTO finnish_words(word) VALUES
('wrap');

-- Words starting with X
-- No words

-- Words starting with Y
INSERT INTO finnish_words(word) VALUES
('yang'), ('ydin'), ('yhtä'), ('yksi'), ('ylen'), ('ylin'), ('yliö'), ('ylkä'), ('ylle'), ('yllä'),
('yltä'), ('ylös'), ('ynnä'), ('yrjö'), ('yrmy'), ('yskä'), ('yuan');


-- Words starting with Z
INSERT INTO finnish_words(word) VALUES
('zulu');

-- Words starting with Å
-- No words

-- Words starting with Ä
INSERT INTO finnish_words(word) VALUES
('ähke'), ('ähky'), ('äijä'), ('äimä'), ('äiti'), ('äkeä'), ('äklö'), ('äksy'), ('älli'), ('ällä'),
('ällö'), ('ämmä'), ('äppi'), ('äreä'), ('ärjy'), ('ässä'), ('äyri'), ('ääni'), ('ääri');

-- Words starting with Ö
INSERT INTO finnish_words(word) VALUES
('öklö'), ('öljy');