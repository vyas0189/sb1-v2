export const initialData = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic device repair and maintenance services',
    children: [
      {
        id: '1-1',
        name: 'Smartphones',
        description: 'Smartphone repair and support services',
        children: [
          {
            id: '1-1-1',
            name: 'iPhone',
            description: 'Apple iPhone repair and maintenance',
            children: [
              { 
                id: '1-1-1-1', 
                name: 'Screen Repair',
                description: 'Professional iPhone screen replacement and repair services' 
              },
              { 
                id: '1-1-1-2', 
                name: 'Battery Replacement',
                description: 'iPhone battery replacement with genuine parts' 
              },
              { 
                id: '1-1-1-3', 
                name: 'Camera Repair',
                description: 'iPhone camera module repair and replacement' 
              },
              { 
                id: '1-1-1-4', 
                name: 'Water Damage Repair',
                description: 'Professional water damage assessment and repair' 
              }
            ]
          },
          {
            id: '1-1-2',
            name: 'Samsung',
            description: 'Samsung smartphone repair and maintenance',
            children: [
              { 
                id: '1-1-2-1', 
                name: 'Screen Repair',
                description: 'Samsung screen replacement with original parts' 
              },
              { 
                id: '1-1-2-2', 
                name: 'Battery Service',
                description: 'Samsung battery replacement and optimization' 
              },
              { 
                id: '1-1-2-3', 
                name: 'Motherboard Repair',
                description: 'Advanced motherboard diagnostics and repair' 
              },
              { 
                id: '1-1-2-4', 
                name: 'Software Issues',
                description: 'Software troubleshooting and system recovery' 
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Book of Work',
    description: 'Project management and work tracking services',
    children: [
      {
        id: '2-1',
        name: 'Project Management',
        description: 'Comprehensive project management services',
        children: [
          {
            id: '2-1-1',
            name: 'Planning',
            description: 'Project planning and strategy development',
            children: [
              { 
                id: '2-1-1-1', 
                name: 'Project Timeline',
                description: 'Create and manage project timelines and milestones' 
              },
              { 
                id: '2-1-1-2', 
                name: 'Resource Allocation',
                description: 'Efficient allocation and management of project resources' 
              },
              { 
                id: '2-1-1-3', 
                name: 'Budget Planning',
                description: 'Project budget planning and cost management' 
              }
            ]
          },
          {
            id: '2-1-2',
            name: 'Execution',
            description: 'Project execution and delivery management',
            children: [
              { 
                id: '2-1-2-1', 
                name: 'Task Management',
                description: 'Track and manage project tasks and deliverables' 
              },
              { 
                id: '2-1-2-2', 
                name: 'Progress Tracking',
                description: 'Monitor and report project progress and status' 
              },
              { 
                id: '2-1-2-3', 
                name: 'Quality Control',
                description: 'Ensure project quality standards and compliance' 
              }
            ]
          }
        ]
      }
    ]
  }
];