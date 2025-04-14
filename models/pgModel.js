const pgData = {
    name: "XYZ Hostel",
    location: "City Name",
    owner: "Owner Name",
    contact: "+91XXXXXXXXXX",
  
    total_rooms: 20,
    available_beds: 50,
    rent_per_bed: 5000,
  
    facilities: ["WiFi", "AC", "Laundry"],
    amenities: ["Gym", "Parking", "Security"],
    services: ["Food", "Laundry Service"],
  
    security_deposit: 10000,
    payment_terms: "Due on 1st of each month",
  
    room_types: ["Single", "Double", "Triple"],
    room_description: "Each room is fully furnished.",
  
    staff: ["staff1", "staff2"],
    staff_details: [
      {
        name: "Staff1",
        role: "Manager",
        contact_number: "+91XXXXXXX",
        email: "staff1@example.com"
      },
      {
        name: "Staff2",
        role: "Housekeeper",
        contact_number: "+91XXXXXXX",
        email: "staff2@example.com"
      }
    ],
  
    safety_features: ["CCTV", "Fire Extinguishers"],
    emergency_contacts: ["911", "100"],
  
    nearest_landmark: "City Mall",
    distance_to_key_locations: {
      University: "2 km",
      Hospital: "1 km"
    },
  
    house_rules: ["No smoking", "No loud noise after 10 PM"],
    guest_policy: "Guests allowed with prior permission",
    health_services: "First aid kit available",
  
    events_calendar: {
      "2025-04-15": "Welcome Party",
      "2025-05-01": "Labor Day BBQ"
    },
  
    rating: 4.5,
    reviews: [
      {
        reviewer_id: "user1",
        rating: 5,
        comment: "Excellent service and facilities."
      },
      {
        reviewer_id: "user2",
        rating: 4,
        comment: "Good but could improve on cleanliness."
      }
    ],
  
    created_at: new Date(),
    updated_at: new Date()
  };
  