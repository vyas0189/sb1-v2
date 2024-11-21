export const initialData = [
  {
    id: '1',
    name: 'Electronics',
    children: [
      {
        id: '1-1',
        name: 'Smartphones',
        children: [
          {
            id: '1-1-1',
            name: 'iPhone',
            children: [
              { id: '1-1-1-1', name: 'Screen Repair' },
              { id: '1-1-1-2', name: 'Battery Replacement' },
              { id: '1-1-1-3', name: 'Camera Repair' },
              { id: '1-1-1-4', name: 'Water Damage Repair' }
            ]
          },
          {
            id: '1-1-2',
            name: 'Samsung',
            children: [
              { id: '1-1-2-1', name: 'Screen Repair' },
              { id: '1-1-2-2', name: 'Battery Service' },
              { id: '1-1-2-3', name: 'Motherboard Repair' },
              { id: '1-1-2-4', name: 'Software Issues' }
            ]
          }
        ]
      },
      // ... rest of the data structure remains the same
    ]
  }
];