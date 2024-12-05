export const adminAcademicLocations = [
    // Administrative Core
    {
        id: 1,
        name: "Senate Building",
        type: "administrative",
        coordinates: [6.5171, 3.3875],
        description: "University administrative headquarters",
        connections: [2, 3, 74, 71] 
    },
    {
        id: 2,
        name: "University Registry",
        type: "administrative",
        coordinates: [6.5170, 3.3873],
        description: "Administrative offices",
        connections: [1, 3, 20, 74] 
    },
    {
        id: 3,
        name: "Bursary",
        type: "administrative",
        coordinates: [6.5169, 3.3874],
        description: "Financial office",
        connections: [1, 2, 20] 
    },

    // Engineering and Science Cluster
    {
        id: 10,
        name: "Faculty of Engineering",
        type: "academic",
        coordinates: [6.5175, 3.3868],
        description: "Engineering departments and laboratories",
        connections: [21, 80, 81, 95, 11] 
    },
    {
        id: 11,
        name: "Faculty of Science",
        type: "academic",
        coordinates: [6.5173, 3.3870],
        description: "Science departments",
        connections: [10, 94, 12] 
    },
    {
        id: 12,
        name: "Faculty of Arts",
        type: "academic",
        coordinates: [6.5172, 3.3867],
        description: "Arts and humanities",
        connections: [13, 15, 82] 
    },
    {
        id: 13,
        name: "Faculty of Law",
        type: "academic",
        coordinates: [6.5174, 3.3869],
        description: "Law faculty building",
        connections: [12, 15, 74, 23] 
    },
    {
        id: 14,
        name: "Faculty of Education",
        type: "academic",
        coordinates: [6.5171, 3.3866],
        description: "Education department",
        connections: [15, 92, 25] 
    },
    {
        id: 15,
        name: "Faculty of Social Sciences",
        type: "academic",
        coordinates: [6.5170, 3.3868],
        description: "Social sciences departments",
        connections: [14, 16, 82, 74] 
    },
    {
        id: 16,
        name: "Faculty of Management Sciences",
        type: "academic",
        coordinates: [6.5169, 3.3867],
        description: "Business and management studies",
        connections: [15, 82, 72] 
    },

    // Academic Departments
    {
        id: 80,
        name: "Department of Chemical Engineering",
        type: "academic",
        coordinates: [6.5174, 3.3869],
        description: "Chemical engineering labs and classrooms",
        connections: [10, 81, 21] 
    },
    {
        id: 81,
        name: "Department of Systems Engineering",
        type: "academic",
        coordinates: [6.5175, 3.3870],
        description: "Systems engineering complex",
        connections: [10, 80, 21, 95] 
    },
    {
        id: 82,
        name: "Department of Mass Communication",
        type: "academic",
        coordinates: [6.5172, 3.3868],
        description: "Media studies and journalism",
        connections: [15, 16, 72]
    }
];

export const transportFacilitiesLocations = [
    // Transport Hubs
    {
        id: 90,
        name: "Main Gate Taxi Stand",
        type: "transport",
        coordinates: [6.5157, 3.3862],
        description: "Primary taxi pickup point",
        connections: [40, 91, 92, 93, 46] // Connected to Main Gate, bus stops, and nearby facilities
    },
    {
        id: 91,
        name: "New Hall Bus Stop",
        type: "transport",
        coordinates: [6.5165, 3.3865],
        description: "Campus shuttle stop",
        connections: [90, 92, 31, 32, 41, 44] // Connected to halls and sports center
    },
    {
        id: 92,
        name: "Faculty of Education Bus Stop",
        type: "transport",
        coordinates: [6.5160, 3.3863],
        description: "Public transport stop",
        connections: [90, 91, 14, 45, 46] // Connected to Education faculty and religious centers
    },
    {
        id: 93,
        name: "DLI Bus Terminal",
        type: "transport",
        coordinates: [6.5173, 3.3876],
        description: "Distance Learning Institute transport hub",
        connections: [90, 94, 70, 75] // Connected to other transport and landmarks
    },
    {
        id: 94,
        name: "Sciences Bus Stop",
        type: "transport",
        coordinates: [6.5170, 3.3870],
        description: "Science faculty shuttle stop",
        connections: [93, 95, 11, 71] // Connected to science buildings and auditorium
    },
    {
        id: 95,
        name: "Engineering Car Park",
        type: "transport",
        coordinates: [6.5175, 3.3869],
        description: "Engineering faculty parking",
        connections: [94, 10, 81, 21] // Connected to engineering buildings
    },
    // Facilities
    {
        id: 40,
        name: "UNILAG Main Gate",
        type: "entrance",
        coordinates: [6.5157, 3.3861],
        description: "Main campus entrance",
        connections: [90, 91, 46, 45] // Connected to transport and nearby facilities
    },
    {
        id: 41,
        name: "Sports Center",
        type: "sports",
        coordinates: [6.5166, 3.3865],
        description: "Sports complex and facilities",
        connections: [91, 31, 44, 50] // Connected to residence halls and multipurpose hall
    },
    {
        id: 42,
        name: "University Health Centre",
        type: "medical",
        coordinates: [6.5168, 3.3866],
        description: "Medical facility",
        connections: [43, 50, 72, 15] // Connected to commercial area and nearby buildings
    },
    {
        id: 43,
        name: "University Bookshop",
        type: "commercial",
        coordinates: [6.5167, 3.3867],
        description: "Campus bookstore",
        connections: [42, 50, 51, 52] // Connected to other commercial facilities
    },
    {
        id: 44,
        name: "UNILAG Multipurpose Hall",
        type: "facility",
        coordinates: [6.5165, 3.3864],
        description: "Events and ceremonies venue",
        connections: [41, 91, 31, 32] // Connected to transport and residence halls
    },
    {
        id: 45,
        name: "University Chapel",
        type: "religious",
        coordinates: [6.5164, 3.3863],
        description: "Christian worship center",
        connections: [40, 46, 92] // Connected to mosque and nearby transport
    },
    {
        id: 46,
        name: "University Mosque",
        type: "religious",
        coordinates: [6.5164, 3.3862],
        description: "Islamic worship center",
        connections: [40, 45, 92] // Connected to chapel and nearby transport
    }
];

// Landmarks and Commercial Locations
export const landmarksCommercialLocations = [
    // Landmarks
    {
        id: 70,
        name: "UNILAG Lagoon Front",
        type: "landmark",
        coordinates: [6.5176, 3.3880],
        description: "Scenic waterfront area",
        connections: [75, 93, 21] // Connected to Indomie Bridge, DLI transport, and Engineering Library
    },
    {
        id: 71,
        name: "J.F. Ade Ajayi Auditorium",
        type: "landmark",
        coordinates: [6.5170, 3.3870],
        description: "Main university auditorium",
        connections: [74, 94, 2, 1, 20] // Connected to Quadrangle, transport, and administrative buildings
    },
    {
        id: 72,
        name: "UNILAG Alumni Garden",
        type: "landmark",
        coordinates: [6.5168, 3.3868],
        description: "Commemorative garden",
        connections: [73, 42, 50, 15, 16] // Connected to halls and nearby facilities
    },
    {
        id: 73,
        name: "Jelili Omotola Hall",
        type: "landmark",
        coordinates: [6.5169, 3.3867],
        description: "Multi-purpose hall",
        connections: [72, 74, 15, 16] // Connected to other landmarks and academic buildings
    },
    {
        id: 74,
        name: "UNILAG Quadrangle",
        type: "landmark",
        coordinates: [6.5171, 3.3869],
        description: "Central campus square",
        connections: [71, 73, 1, 2, 15, 13] // Central connection point
    },
    {
        id: 75,
        name: "Indomie Bridge",
        type: "landmark",
        coordinates: [6.5175, 3.3878],
        description: "Iconic campus bridge",
        connections: [70, 93, 21, 10] // Connected to waterfront and engineering area
    },
    // Commercial Area
    {
        id: 50,
        name: "UNILAG Shopping Complex",
        type: "commercial",
        coordinates: [6.5166, 3.3868],
        description: "Campus shopping area",
        connections: [51, 52, 42, 43, 72] // Connected to banks and nearby facilities
    },
    {
        id: 51,
        name: "First Bank",
        type: "commercial",
        coordinates: [6.5167, 3.3869],
        description: "Banking facility",
        connections: [50, 52, 43] // Connected to shopping complex and other bank
    },
    {
        id: 52,
        name: "GTBank",
        type: "commercial",
        coordinates: [6.5167, 3.3870],
        description: "Banking facility",
        connections: [50, 51, 43] // Connected to shopping complex and other bank
    }
];

export const librariesHousingLocations = [
    // Libraries
    {
        id: 20,
        name: "Main Library",
        type: "library",
        coordinates: [6.5169, 3.3872],
        description: "University central library",
        connections: [2, 3, 71, 1, 74, 82] // Connected to admin buildings and central landmarks
    },
    {
        id: 21,
        name: "Engineering Library",
        type: "library",
        coordinates: [6.5176, 3.3869],
        description: "Engineering faculty library",
        connections: [10, 80, 81, 75, 95] // Connected to engineering buildings and bridge
    },
    // Student Housing - Main Campus
    {
        id: 30,
        name: "Mariere Hall",
        type: "residence",
        coordinates: [6.5163, 3.3869],
        description: "Male student residence",
        connections: [31, 33, 91, 41, 44] // Connected to other halls and nearby facilities
    },
    {
        id: 31,
        name: "Moremi Hall",
        type: "residence",
        coordinates: [6.5164, 3.3870],
        description: "Female student residence",
        connections: [30, 32, 91, 41, 44, 50] // Connected to halls and shopping area
    },
    {
        id: 32,
        name: "Jaja Hall",
        type: "residence",
        coordinates: [6.5165, 3.3871],
        description: "Postgraduate residence",
        connections: [31, 91, 50, 42, 72] // Connected to facilities and landmarks
    },
    {
        id: 33,
        name: "El-Kanemi Hall",
        type: "residence",
        coordinates: [6.5162, 3.3868],
        description: "Male student residence",
        connections: [30, 34, 91, 92, 45] // Connected to other male halls and facilities
    },
    {
        id: 34,
        name: "Biobaku Hall",
        type: "residence",
        coordinates: [6.5161, 3.3867],
        description: "Student residence",
        connections: [33, 92, 45, 46] // Connected to nearby halls and religious centers
    },
    // Additional Student Housing Facilities
    {
        id: 35,
        name: "Honours Hall",
        type: "residence",
        coordinates: [6.5166, 3.3872],
        description: "Merit student residence",
        connections: [31, 32, 50, 72, 42] // Connected to female halls and facilities
    },
    {
        id: 36,
        name: "Fagunwa Hall",
        type: "residence",
        coordinates: [6.5162, 3.3866],
        description: "Female student residence",
        connections: [34, 33, 92, 45, 46] // Connected to other halls and facilities
    },
    {
        id: 37,
        name: "Makama Hall",
        type: "residence",
        coordinates: [6.5163, 3.3865],
        description: "Postgraduate female residence",
        connections: [36, 34, 92, 45] // Connected to female halls and facilities
    },
    // Study Areas and Reading Rooms
    {
        id: 22,
        name: "Science Reading Room",
        type: "library",
        coordinates: [6.5174, 3.3871],
        description: "Science faculty reading area",
        connections: [11, 23, 20] // Connected to science buildings
    },
    {
        id: 23,
        name: "Law Library",
        type: "library",
        coordinates: [6.5174, 3.3870],
        description: "Faculty of Law library",
        connections: [13, 82, 71, 74] // Connected to law faculty and central area
    },
    {
        id: 24,
        name: "Medical Library",
        type: "library",
        coordinates: [6.5167, 3.3873],
        description: "Medical sciences library",
        connections: [42, 20, 71, 72] // Connected to medical center and main library
    },
    {
        id: 25,
        name: "Digital Resource Center",
        type: "library",
        coordinates: [6.5170, 3.3871],
        description: "Electronic library and computer center",
        connections: [20, 82, 71] // Connected to main library and computer science
    }
];