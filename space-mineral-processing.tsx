import { useState } from 'react';
import { ChevronRight, ChevronLeft, Info, ExternalLink, RefreshCw, Database, FileText } from 'lucide-react';

// Data for the stages with NASA images and resource links
const stages = [
  {
    title: "Prospecting & Site Selection",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "NASA Lunar Reconnaissance Orbiter mapping potential lunar resource zones (Credit: NASA/GSFC)",
    description: "Identifying resource-rich areas using orbital mapping, rovers, and sample analysis.",
    details: "Space prospecting differs from Earth methods by relying more on remote sensing. Orbital spectroscopy identifies mineral deposits, while rovers provide ground-truth data. Key technologies include multi-spectral imaging, neutron spectrometers to detect hydrogen, and mass spectrometry for compositional analysis.",
    comparison: "Earth: Uses drilling cores, geological surveys, and sample extraction with heavy equipment.\n\nSpace: Relies on orbital spectroscopy, remote sensing, and lightweight robotic exploration. Must operate with minimal human intervention and extreme communication delays.",
    regolith: {
      moon: "Lunar regolith consists primarily of anorthosite (45-60% plagioclase feldspar), pyroxene (20-40%), olivine (0-10%), and ilmenite (5-15%). Contains valuable elements like titanium, iron, aluminum, and potentially rare earth elements. Highland areas contain more aluminum, while mare regions are richer in iron and titanium.",
      mars: "Martian regolith contains iron oxides (giving its red color), silicates, sulfates, and perchlorates. Varies significantly by region, with polar regions containing water ice deposits. Contains minerals like hematite, jarosite, and gypsum that indicate past water activity."
    },
    color: "bg-blue-800",
    links: [
      { 
        title: "Lunar Reconnaissance Orbiter", 
        url: "https://lunar.gsfc.nasa.gov/" 
      },
      { 
        title: "Moon Mineralogy Mapper", 
        url: "https://www.nasa.gov/mission_pages/moon/multimedia/m3.html" 
      }
    ]
  },
  {
    title: "Excavation in Low Gravity",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "RASSOR prototype testing at Kennedy Space Center (Credit: NASA/Kim Shiflett)",
    description: "Extracting regolith and rock using specialized equipment adapted for space conditions.",
    details: "Excavation in space faces unique challenges including low gravity (reducing traction), vacuum conditions, extreme temperature variations, and the need for lightweight equipment. Technologies include bucket drums that counter-rotate to offset reaction forces, screw-propelled excavators, and pneumatic collection systems.",
    comparison: "Earth: Uses heavy machinery relying on weight and traction, with minimal concern for dust contamination.\n\nSpace: Requires lightweight equipment designed for minimal reaction forces in low gravity. Must prevent dust contamination of mechanical parts and minimize power consumption.",
    regolith: {
      moon: "Lunar regolith is extremely abrasive due to sharp, jagged particles formed without weathering. Consists of fine dust that clings to surfaces via electrostatic forces and penetrates seals. Has high bulk strength and compaction properties requiring significant force to excavate.",
      mars: "Martian regolith is less abrasive than lunar material due to wind erosion creating more rounded particles. Contains perchlorates which are corrosive to equipment. Surface cohesion varies by location, with some areas having loose sand-like material while others have cemented crusts."
    },
    color: "bg-gray-700",
    links: [
      { 
        title: "NASA RASSOR Excavator", 
        url: "https://technology.nasa.gov/patent/KSC-TOPS-7" 
      },
      { 
        title: "ISRU Technology Development", 
        url: "https://www.nasa.gov/isru" 
      }
    ]
  },
  {
    title: "Crushing & Grinding",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "ISRU-compatible sealed ball mill prototype for lunar material processing (Credit: NASA)",
    description: "Breaking down material with specialized equipment designed for vacuum and extreme temperatures.",
    details: "Crushing and grinding in space requires dust containment systems and must operate without lubricants that would vaporize in vacuum. Common approaches include ball mills modified for space, impact crushers, and electromagnetic pulse fragmentation for targeted mineral separation.",
    comparison: "Earth: Uses water-based systems with wet grinding to control dust and heat, often with chemical additives.\n\nSpace: Requires dry, sealed systems resistant to vacuum and extreme temperatures. Must minimize power, mass, and wear while containing hazardous dust.",
    regolith: {
      moon: "Lunar regolith particle sizes typically range from fine dust (<1μm) to coarse sand (>1mm). Hardness values of 6-7 on Mohs scale make it challenging to process. Contains glass spherules and agglutinates (glass-bound particle clusters) formed by micrometeorite impacts.",
      mars: "Martian regolith contains more clay-sized particles than lunar soil due to ancient water activity. Contains various hydrated minerals that may release water during processing. Particle sizes vary from very fine dust to larger, wind-rounded grains."
    },
    color: "bg-stone-700",
    links: [
      { 
        title: "ISRU Materials Processing", 
        url: "https://www.nasa.gov/isru/materials-processing" 
      },
      { 
        title: "Lunar Simulant Materials", 
        url: "https://isru.nasa.gov/simulants.html" 
      }
    ]
  },
  {
    title: "Sieving & Sorting",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "Perseverance rover magnetic sample separator, Mars 2021 (Credit: NASA/JPL-Caltech)",
    description: "Separating materials by size and type using mechanical or electrostatic methods.",
    details: "In space environments, conventional wet screening isn't feasible. Vibrating screens must be designed to work in varying gravity levels. Alternative methods include magnetic separation for iron-bearing minerals, electrostatic separation for charged particles, and eddy current sorting for conductive materials.",
    comparison: "Earth: Primarily uses wet screening with water to aid material flow and control dust.\n\nSpace: Must use dry screening techniques with special attention to dust control. Utilizes the vacuum environment for novel separation methods like ballistic sorting.",
    regolith: {
      moon: "Lunar regolith magnetic susceptibility varies widely between mare (higher iron content) and highland (lower iron content) regions. Contains naturally occurring nanophase iron particles distributed throughout the dust particles, making magnetic separation particularly effective.",
      mars: "Martian regolith contains 5-15% magnetic minerals including magnetite and maghemite. Grain size distribution is bimodal with very fine dust and coarser sand. Significant regional variation exists between dune fields, ancient lakebed deposits, and volcanic plains."
    },
    color: "bg-amber-800",
    links: [
      { 
        title: "Mars Perseverance Mission", 
        url: "https://mars.nasa.gov/mars2020/" 
      },
      { 
        title: "NASA Electrostatic Separator", 
        url: "https://technology.nasa.gov/patent/KSC-TOPS-96" 
      }
    ]
  },
  {
    title: "Beneficiation",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "Electrostatic beneficiation test rig at NASA Swamp Works Lab (Credit: NASA)",
    description: "Enhancing mineral concentration through techniques adapted for vacuum environments.",
    details: "Beneficiation in space must occur without water or air. Leading techniques include triboelectric charging where particles develop different charges based on composition, magnetic drum separation for iron-bearing minerals, and centrifugal separation leveraging density differences.",
    comparison: "Earth: Uses flotation cells with water and chemical reagents to separate minerals based on surface properties.\n\nSpace: Must use waterless methods including electrostatic separation, magnetic separation, and mechanical classification. Vacuum environment enables novel separation techniques not possible on Earth.",
    regolith: {
      moon: "Lunar ilmenite is the primary target mineral for oxygen production (FeTiO₃), comprising 5-15% of mare regolith. Anorthite (CaAl₂Si₂O₈) is targeted for aluminum and silicon. Potential concentration methods include size, magnetic, and electrostatic separation.",
      mars: "Martian hematite and other iron oxides are abundant and easily identified by color. Hydrated minerals including clays and sulfates are valuable for water extraction. Dust storms have naturally sorted particles by size across the surface, creating natural beneficiation."
    },
    color: "bg-indigo-800",
    links: [
      { 
        title: "NASA Swamp Works", 
        url: "https://www.nasa.gov/centers/kennedy/swampworks" 
      },
      { 
        title: "Lunar ISRU Papers", 
        url: "https://ntrs.nasa.gov/search?q=lunar%20beneficiation" 
      }
    ]
  },
  {
    title: "Extraction & Processing",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "FFC Cambridge reactor for oxygen and metal extraction from lunar regolith (Credit: NASA/ESA)",
    description: "Converting minerals into usable resources using thermal, chemical, or electrolytic processes.",
    details: "Extraction processes in space focus on obtaining critical resources like oxygen, metals, and water. Key technologies include hydrogen reduction to extract oxygen from iron-rich minerals, molten salt electrolysis to separate oxygen and metals, and carbothermal reduction using methane to process silicates.",
    comparison: "Earth: Uses energy-intensive processes with less concern for mass and volume. Can use hazardous or consumable reagents.\n\nSpace: Requires energy-efficient, closed-loop systems that minimize consumables and waste. Processes must be simple, reliable, and amenable to automation.",
    regolith: {
      moon: "Lunar regolith yields: 40-45% oxygen by weight, 10-20% silicon, 5-15% aluminum, 5-15% calcium, 5-15% iron, and 1-5% titanium. Highland regolith is richer in aluminum and calcium, while mare regolith contains more iron and titanium.",
      mars: "Martian regolith yields: 30-40% oxygen by weight, 15-25% silicon, 5-15% iron, 3-8% aluminum, and 2-5% calcium. Contains 0.5-5% water in hydrated minerals, with higher concentrations at higher latitudes. Contains perchlorates (0.5-1%) that can be processed into rocket propellant."
    },
    color: "bg-red-900",
    links: [
      { 
        title: "NASA MOXIE", 
        url: "https://mars.nasa.gov/mars2020/spacecraft/instruments/moxie/" 
      },
      { 
        title: "Lunar Oxygen Extraction", 
        url: "https://www.nasa.gov/isru/oxygen-extraction" 
      }
    ]
  },
  {
    title: "Resource Storage & Utilization",
    realImage: "/api/placeholder/800/400", // NASA image placeholder
    imageCaption: "3D printed lunar regolith pillars from ESA URBANITE project (Credit: ESA/URBANITE)",
    description: "Storing and using extracted resources for life support, fuel, construction, and manufacturing.",
    details: "Extracted resources serve multiple vital functions in space operations. Oxygen provides breathable air and oxidizer for propellant. Metals are used for construction and spare parts manufacturing via 3D printing. Regolith itself serves as radiation shielding and construction material when sintered or mixed with binders.",
    comparison: "Earth: Uses standard tanks and storage methods with minimal concern for mass or leakage.\n\nSpace: Requires specialized containers resistant to extreme temperatures and radiation. Must minimize mass while ensuring zero leakage, particularly for gases.",
    regolith: {
      moon: "Raw lunar regolith serves as excellent radiation shielding when contained in fabric bags or compressed into blocks. When mixed with polymers or melted with microwave sintering, forms construction materials with compressive strength of 30-50 MPa. Extraction byproducts can be processed into glass fibers for composites.",
      mars: "Martian regolith mixed with polyethylene creates effective radiation shielding. Can be combined with biopolymers produced from mission waste to form construction materials. Contains sufficient clays that, when mixed with water, can form adobe-like building materials without additional processing."
    },
    color: "bg-green-800",
    links: [
      { 
        title: "3D Printing with Regolith", 
        url: "https://www.nasa.gov/isru/additive-construction" 
      },
      { 
        title: "NASA Artemis Program", 
        url: "https://www.nasa.gov/artemis" 
      }
    ]
  }
];

const TabContent = ({ title, content, color="bg-gray-800" }) => (
  <div className="mt-2 p-4 rounded bg-gray-800 bg-opacity-50">
    <h3 className={`text-lg font-medium ${color} bg-opacity-40 p-2 rounded mb-2`}>{title}</h3>
    <div className="whitespace-pre-wrap text-sm">{content}</div>
  </div>
);

export default function SpaceMineralProcessing() {
  const [stage, setStage] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const [planet, setPlanet] = useState('moon');
  
  const currentStage = stages[stage];
  
  return (
    <div className="flex flex-col space-y-6 bg-gray-900 p-6 rounded-lg text-white min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center flex-1">Space Mineral Processing</h1>
      </div>
      
      {/* Progress Bar */}
      <div className="flex flex-wrap gap-2 justify-center">
        {stages.map((s, idx) => (
          <button 
            key={idx}
            onClick={() => setStage(idx)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${idx === stage ? 'ring-2 ring-white ' + s.color : 'bg-gray-700 opacity-60'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      
      {/* Stage Navigation */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setStage((stage - 1 + stages.length) % stages.length)} 
          className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <h2 className="text-xl font-bold">{currentStage.title}</h2>
        <button 
          onClick={() => setStage((stage + 1) % stages.length)} 
          className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Image Section */}
        <div className="md:col-span-2 space-y-2">
          <div className="relative rounded overflow-hidden bg-gray-800 aspect-video flex items-center justify-center">
            <img 
              src={currentStage.realImage} 
              alt={currentStage.title} 
              className="w-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-400 italic">{currentStage.imageCaption}</p>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
            <p>{currentStage.description}</p>
          </div>
          
          {/* Resource Links */}
          {currentStage.links && currentStage.links.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold mb-2 text-blue-300">NASA Resources:</h3>
              <div className="flex flex-wrap gap-2">
                {currentStage.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {link.title} <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Information Panel */}
        <div className="space-y-3">
          <div className={`p-4 rounded ${currentStage.color} bg-opacity-30`}>
            <h3 className="font-bold mb-2">Stage {stage+1}/{stages.length}</h3>
            <p className="text-sm">{currentStage.title}</p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab(activeTab === 'details' ? null : 'details')}
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 p-2 rounded transition-colors"
            >
              <Info size={18} /> Technical Details
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === 'comparison' ? null : 'comparison')}
              className="flex items-center gap-2 bg-purple-900 hover:bg-purple-800 p-2 rounded transition-colors"
            >
              <FileText size={18} /> Earth vs Space Comparison
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === 'regolith' ? null : 'regolith')}
              className="flex items-center gap-2 bg-green-900 hover:bg-green-800 p-2 rounded transition-colors"
            >
              <Database size={18} /> Regolith Data ({planet === 'moon' ? 'Lunar' : 'Martian'})
            </button>
            <button 
              onClick={() => setPlanet(planet === 'moon' ? 'mars' : 'moon')}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            >
              <RefreshCw size={18} /> Toggle: {planet === 'moon' ? 'MOON' : 'MARS'}
            </button>
          </div>
          
          {/* Display active tab content */}
          {activeTab === 'details' && (
            <TabContent 
              title="Technical Details" 
              content={currentStage.details}
              color="bg-blue-800"
            />
          )}
          
          {activeTab === 'comparison' && (
            <TabContent 
              title="Earth vs Space Comparison" 
              content={currentStage.comparison}
              color="bg-purple-800"  
            />
          )}
          
          {activeTab === 'regolith' && (
            <TabContent 
              title={`${planet === 'moon' ? 'Lunar' : 'Martian'} Regolith Data`} 
              content={currentStage.regolith[planet]}
              color="bg-green-800"
            />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-6">
        <p>Space Mineral Processing Interactive Tool - © 2025</p>
        <p className="mt-1">
          <a href="https://www.nasa.gov/isru" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            NASA ISRU Program
          </a> | 
          <a href="https://www.nasa.gov/artemis" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
            Artemis Program
          </a>
        </p>
      </div>
    </div>
  );
}
