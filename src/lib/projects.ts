export type Project = {
  name: string;
  length: string;
  year: string;
  location: string;
  collaborator: string;
};
const parse = (source: string): Project[] =>
  source
    .trim()
    .split("\n")
    .map((line) => {
      const [name, length, year, location, collaborator] = line.split("|");
      return {
        name: name ?? "",
        length: length ?? "",
        year: year ?? "",
        location: location ?? "",
        collaborator: collaborator ?? "",
      };
    });
export const projects = {
  "New Builds": parse(`Genesis 153′ Hull #2|46.5 m|2003|Italy|Luiz De Basto
Genesis 153′ Hull #1|46.5 m|2002|Italy|Luiz De Basto
Barracuda Italmarine 112′|34.15 m|1994|Italy|Arrabito / Evan K. Marshall
Destiny Yachts 98′|29.8 m|1997|USA|Arrabito / Evan K. Marshall
Genesis 72′|21.5 m|1996|Italy|Genesis`),
  "Yacht Interiors":
    parse(`Confidential project · loose furniture|141 m|2014|Abu Dhabi|Pierre Jean Studio
Maryah 410′|125 m|2014|Greece|Jonny Horsfield
Dream 348′|106 m|2018|Greece|CQS
Confidential project|90 m|2018|USA|Genesis
Imagine · Trinity Yachts|59 m|2016|USA|Sylvie Charest
Insigna|55 m|2005|Greece|Luiz De Basto
Crescent 164′|50 m|2021|Canada|H2 Yacht Design
Imagine · Trinity Yachts|50 m|2010|USA|Sylvie Charest
Genesis 153′|46.5 m|2002|Italy|Luiz De Basto
Legacy 150′|45 m|2026|Canada|Gregory C. Marshall
Tuscan Sun 150′|45 m|2006|Spain|Luiz De Basto
OA44 144′ Hull #1|44 m|2026|Italy|Giorgio Cassetta
OA44 144′ Hull #2|44 m|2026|Italy|Giorgio Cassetta
DauntLess 138′|42 m|2025|Canada|Gregory C. Marshall
Adler|41.5 m|2005|USA|Luiz de Basto
Cheoy Lee 130′|40 m|2024|China|Sylvia Bolton Design
Garfield 124′|38 m|2023|USA|Genesis
Broward 125′ Hull #3|38 m|2008|USA|Shipyard
3701|37 m|2007|France|Shipyard
Broward 120′ Hull #1|36 m|2006|USA|Evan K. Marshall
Broward 120′ Hull #2|36 m|2007|USA|Evan K. Marshall
Serque|38 m|2008|USA|Pavilk Design
35M011|35 m|2015|UK|François Zuretti
Destiny 94′|28.5 m|1998|USA|Evan Marshall
Columbo Yacht 60′|18 m|1994|USA|J.C. Espinosa
530LXF series|16 m|2018|USA|Genesis
Scaramouche 48′|14.5 m|2023|USA|Genesis
Forte 47′|14 m|2025|Italy|PGYD`),
  "Yacht Refits": parse(`Whisper|95 m|2026|USA|Michael Smith, Inc. / Cadogan Tate
Lonian|87 m|2025|USA|Atelier AM
Man of Steel|86 m|2024|Italy|Owner
Seven Seas|86 m|2021|USA|Nuvolari & Lenard
Amaryllis|79 m|2021|USA|Reymond Langton Design
Giant I|74.5 m|2004|Italy|Shipyard
Siren|73 m|2021|USA|New Cruise Yacht Projects + Design
Quantum of Solace|72 m|2020|USA|Evan K. Marshall
Azteca|72 m|2016|Italy|Genesis
Saint Nicolas|70 m|2021|USA|François Zuretti
Samaya|70 m|2018|USA|Paola Lenti
Spectre|69 m|2021|USA|Shipyard
Utopia IV|63 m|2019|USA|Team For Design
Satori|62 m|2019|USA|Shipyard
Swan|60 m|2016|USA|Stefano Natucci
Maximus 193′|59 m|2025|USA|Michael Smith
Kathryn 189′8″|57.8 m|2024|USA|Codecasa
Limerence 172′|53 m|2025|USA|Michael Smith
Sola Fide|52 m|2025|Italy|Supernova Design Studio
Sanam|52 m|2016|USA|Nuvolari & Lenard
Infinity|50 m|2026|USA|Via Design
Franklie|50 m|2026|USA|Fulvio De Simoni
Aspen Alternative|50 m|2025|USA|Evan K. Marshall
Highlander|50 m|2016|Italy|Joanne De Guardiola
Achiever|50 m|1994|Italy|A Group
Omaha|49 m|2019|USA|Shipyard
Mustang Sally|49 m|2016|USA|Shipyard
E.Mottion+|48 m|2021|USA|Shipyard
Kajak|47 m|2026|USA|Luiz De Basto
White Star|47 m|2007|Italy|Shipyard
Focus|46.5 m|2018|USA|George Paturzo
Alegria|46 m|2019|USA|Roost Creative
Pick Up|46 m|2019|USA|Shipyard
Terancar Nadine|46 m|1994|Italy|Shipyard
Zembra|46 m|2026|USA|Owner & Delta Marine
Audacia|46 m|2008|Italy|Joanne De Guardiola
Amica Mea|46 m|2020|USA|Roost Creative
Havre de Grace|45 m|1992|Italy|Genesis
All Seven|45 m|1998|Italy|Shipyard
Lady Joy|45 m|2004|USA|Claudette Bonville
Il Barbetta|44 m|2021|USA|Genesis
MAG III|44.2 m|2014|USA|Genesis
MIM|43.9 m|2018|USA|Owner
King Baby|43 m|2016|USA|Evan K. Marshall
Mr. D|43 m|2018|USA|Shipyard
Tranquillity|42 m|2021|USA|Shipyard
Namaste|41 m|2019|USA|Shipyard
Chiqui|40 m|2016|Monaco|Shipyard
Sea Angel|40 m|1997|Greece|Shipyard
Daniella|38 m|2000|Italy|Genesis
Sweet Emocean|36 m|2019|USA|Roost Creative
Randa G.|36 m|1996|Italy|Elie Gharzouzi-Luigi Sturchio
Victoria Won II|36 m|1994|USA|Paola Smith
Intrigue|36 m|1997|USA|Paola Smith
Impulsive|36 m|2008|USA|Paola Smith
Mr. Loui|35 m|2019|USA|Shipyard
Paradigm|35 m|2007|USA|Genesis
Bux|34 m|1990|Italy|Genesis
Perfect Lady|33 m|2021|USA|Shipyard
Rora D.|32 m|1992|Italy|Genesis
Essence|32 m|2016|Italy|Edwin Berrios
Lady Carmen|31 m|2016|USA|Shipyard
Synesthrsia 100′|30 m|2024|USA|RC Design / Cadogan Tate
Agua Dulce|30 m|2025|USA|Owner
My Way|30 m|1996|Greece|Shipyard
Max II|28 m|1993|Italy|Genesis
Latitude|28 m|2021|USA|Winch Design
Al Johara|27 m|1994|Italy|Genesis
Chance II|27 m|1994|Italy|Genesis
Sei Prima|27 m|1994|Italy|Genesis
Club M|26 m|2018|USA|Shipyard
Branda B.|24 m|1992|Greece|Genesis
Max I|24 m|1993|Italy|Genesis
Ten Ten|24 m|1994|Italy|Aldo Cicchero
Swift|24 m|1995|Greece|Shipyard
Pure Thrill|24 m|1996|Greece|Shipyard
Water Toy|24 m|1997|Greece|Shipyard
Be Happy|24 m|1995|Greece|Shipyard
Diana C.|22.5 m|1995|Greece|Shipyard
Glamour|22.5 m|1995|Greece|Shipyard
All Paloma|22.5 m|1998|Greece|Shipyard
Imagine|22 m|2019|USA|Shipyard
Sir|21 m|1996|Greece|Shipyard
Lady Susan|21 m|1998|USA|Claudette Bonville
Jana|21 m|2004|Italy|Luiz De Basto
Bravissima|20 m|2020|USA|Genesis
Valia|20 m|1995|Greece|Shipyard
Lucifer|20 m|1996|Greece|Shipyard
The Gator|19 m|2013|USA|Shipyard
Motek|19 m|2021|USA|Shipyard
Zero|16 m|2012|USA|Federico Del Rosso
Dont Worry|15 m|1995|Greece|Shipyard`),
};
