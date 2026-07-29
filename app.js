/* 
  =========================================
  SB FASHIONS - MAIN LOGIC & ROUTER CONTROLLER
  =========================================
*/

const SEED_VERSION = '4.0'; // Bump this when seed products/images change

// --- 1. LOCAL STORAGE STATE INITIALIZATION ---
const STATE_KEYS = {
    PRODUCTS: 'sbf_products',
    ORDERS: 'sbf_orders',
    CART: 'sbf_cart',
    WISHLIST: 'sbf_wishlist',
    SESSION: 'sbf_session',
    ANNOUNCEMENT: 'sbf_announcement'
};

// Master catalog builder ensuring AT LEAST 15 distinct products per category (315 items total)
function buildCatalogProducts() {
    const categories = [
        { id: 'sarees', prefix: 'SAR', basePrice: 4999, names: [
            "Bridal Crimson Kanchipuram Silk Saree", "Royal Blue Banarasi Silk Saree", "Emerald Green Organza Printed Saree",
            "Pastel Pink Designer Chiffon Saree", "Mustard Gold Zari Weave Saree", "Midnight Black Velvet Border Saree",
            "Peach Organza Floral Printed Saree", "Wine Red Handloom Uppada Silk Saree", "Lavender Tissue Silk Saree",
            "Teal Green Gadwal Silk Saree", "Marigold Yellow Paithani Saree", "Maroon Bridal Zardosi Saree",
            "Sky Blue Soft Linen Saree", "Rose Gold Tussar Silk Saree", "Emerald Gold Jacquard Silk Saree"
        ], colors: ["Crimson Red / Gold", "Royal Blue", "Emerald Green", "Pastel Pink", "Mustard Gold", "Midnight Black", "Peach Pink", "Wine Red", "Lavender", "Teal Green", "Marigold Yellow", "Deep Maroon", "Sky Blue", "Rose Gold", "Emerald Gold"], imgs: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'frocks', prefix: 'FRO', basePrice: 2499, names: [
            "Crimson Red Embroidered Anarkali Frock", "Emerald Green Georgette Gown Frock", "Pastel Pink Flared Party Frock",
            "Royal Blue Printed Maxi Frock", "Mustard Yellow Gota Patti Frock", "Midnight Black Sequence Evening Frock",
            "Peach Silk Flair Anarkali Frock", "Wine Maroon Threadwork Frock", "Lavender Layered Net Frock",
            "Teal Blue Mirror Work Frock", "Sunshine Yellow Summer Frock", "Maroon Velvet Festival Frock",
            "Sky Blue Georgette Tiered Frock", "Rose Pink Indo-Western Frock", "Olive Green Belted Maxi Frock"
        ], colors: ["Crimson Red", "Emerald Green", "Pastel Pink", "Royal Blue", "Mustard Yellow", "Midnight Black", "Peach Pink", "Wine Maroon", "Lavender", "Teal Blue", "Sunshine Yellow", "Deep Maroon", "Sky Blue", "Rose Pink", "Olive Green"], imgs: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1539008885868-47620f2d263b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391265517-35bbdba01229?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'blouses', prefix: 'BLU', basePrice: 1299, names: [
            "Golden Brocade Readymade Saree Blouse", "Black Velvet Designer Saree Blouse", "Crimson Red Padded Stitched Blouse",
            "Royal Blue Raw Silk Embroidered Blouse", "Emerald Green Deep Neck Silk Blouse", "Pastel Pink Boat Neck Net Blouse",
            "Mustard Yellow Mirror Work Blouse", "Maroon High Neck Zari Blouse", "Silver Metallic Stretchable Saree Blouse",
            "Wine Red Heavy Sequence Stitched Blouse", "Navy Blue Elbow Sleeve Silk Blouse", "Peach Organza Puff Sleeve Blouse",
            "Bottle Green Dori Back Silk Blouse", "Off-White Sleeveless Brocade Blouse", "Rose Pink Kundan Neckline Stitched Blouse"
        ], colors: ["Metallic Gold", "Midnight Black", "Crimson Red", "Royal Blue", "Emerald Green", "Pastel Pink", "Mustard Yellow", "Deep Maroon", "Metallic Silver", "Wine Red", "Navy Blue", "Peach Pink", "Bottle Green", "Off-White", "Rose Pink"], imgs: [
            "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1605497746444-ac9dbd53a474?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'kurti', prefix: 'KUR', basePrice: 899, names: [
            "Yellow Cotton A-Line Kurti Tunic", "Royal Blue Printed Georgette Kurti", "Emerald Green Straight Cut Kurti",
            "Pastel Pink Floral Rayon Tunic", "Crimson Red Anarkali Style Kurti", "Midnight Black Mirror Work Tunic",
            "Mustard Gold Block Print Kurti", "Wine Red Embroidered Kurti", "Lavender Chikankari Tunic",
            "Teal Blue Flared Tunic Kurti", "Coral Orange Cotton Kurti", "Olive Green Belted Kurti",
            "Sky Blue Soft Rayon Kurti", "Rose Gold Sequence Kurti", "White Handloom Khadi Kurti"
        ], colors: ["Bright Yellow", "Royal Blue", "Emerald Green", "Pastel Pink", "Crimson Red", "Midnight Black", "Mustard Gold", "Wine Red", "Lavender", "Teal Blue", "Coral Orange", "Olive Green", "Sky Blue", "Rose Gold", "Pure White"], imgs: [
            "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391265517-35bbdba01229?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: '3-piece-sets', prefix: '3PC', basePrice: 2499, names: [
            "Royal Blue Georgette 3-Piece Kurti Set", "Maroon Heavy Dupatta Salwar Suit Set", "Emerald Green Silk Palazzo 3-Piece Set",
            "Pastel Pink Organza Dupatta Suit", "Mustard Yellow Gota Patti 3-Piece Set", "Crimson Red Bridal Anarkali 3-Piece Set",
            "Midnight Black Sequence 3-Piece Suit", "Peach Chiffon Dupatta Kurti Set", "Teal Blue Mirror Work 3-Piece Set",
            "Lavender Embroidered Kurti Set", "Wine Red Silk Velvet 3-Piece Set", "Sunshine Yellow Festive 3-Piece Set",
            "Sky Blue Straight Pant Suit Set", "Olive Green Floral 3-Piece Set", "Rose Gold Zari Weave 3-Piece Suit"
        ], colors: ["Royal Blue", "Deep Maroon", "Emerald Green", "Pastel Pink", "Mustard Yellow", "Crimson Red", "Midnight Black", "Peach Pink", "Teal Blue", "Lavender", "Wine Red", "Sunshine Yellow", "Sky Blue", "Olive Green", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'half-sarees', prefix: 'HSA', basePrice: 3999, names: [
            "Traditional South Indian Silk Half Saree", "Golden Red Bridal Langa Voni Set", "Royal Blue Pattu Half Saree",
            "Emerald Green Designer Half Saree", "Pastel Pink Net Langa Voni", "Mustard Gold Zari Half Saree",
            "Maroon Velvet Border Half Saree", "Teal Blue Banarasi Half Saree", "Lavender Floral Silk Half Saree",
            "Wine Red Embroidered Langa Voni", "Peach Satin Half Saree", "Sunshine Yellow Temple Border Half Saree",
            "Sky Blue Georgette Half Saree", "Rose Pink Bridal Half Saree", "Olive Green Handloom Half Saree"
        ], colors: ["Multi/Gold", "Golden Red", "Royal Blue", "Emerald Green", "Pastel Pink", "Mustard Gold", "Maroon", "Teal Blue", "Lavender", "Wine Red", "Peach Pink", "Sunshine Yellow", "Sky Blue", "Rose Pink", "Olive Green"], imgs: [
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'petticoats', prefix: 'PET', basePrice: 499, names: [
            "Pure Cotton White Saree Petticoat skirt", "Satin Silk Scarlet Red Saree Petticoat skirt", "Royal Blue Cotton Saree Petticoat",
            "Emerald Green Cotton Petticoat", "Nude Beige Satin Saree Petticoat", "Midnight Black Cotton Petticoat",
            "Golden Yellow Satin Petticoat", "Deep Maroon 6-Panel Cotton Petticoat", "Pastel Pink Satin Underskirt Petticoat",
            "Lavender Cotton Drawstring Petticoat", "Teal Blue Heavy Flared Cotton Petticoat", "Wine Red Satin Silk Petticoat",
            "Sky Blue Breathable Cotton Petticoat", "Off-White Canvas Hem Cotton Petticoat", "Peach Satin Saree Underskirt"
        ], colors: ["Pure White", "Scarlet Red", "Royal Blue", "Emerald Green", "Nude Beige", "Midnight Black", "Golden Yellow", "Deep Maroon", "Pastel Pink", "Lavender", "Teal Blue", "Wine Red", "Sky Blue", "Off-White", "Peach Pink"], imgs: [
            "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'peplum-tops', prefix: 'PEP', basePrice: 1199, names: [
            "Yellow Indo-Western Peplum Crop Top", "Royal Blue Flared Peplum Top", "Emerald Green Embroidered Peplum Top",
            "Crimson Red Sequence Short Peplum", "Pastel Pink Floral Printed Peplum", "Midnight Black Velvet Peplum Top",
            "Mustard Gold Zari Work Peplum", "Maroon Threadwork Indo-Western Peplum", "Teal Blue Georgette Peplum Top",
            "Lavender Layered Short Peplum", "Wine Red Belted Peplum Top", "Sunshine Yellow Summer Peplum",
            "Sky Blue Mirror Work Peplum", "Rose Pink Designer Fusion Peplum", "Olive Green Printed Peplum Top"
        ], colors: ["Bright Yellow", "Royal Blue", "Emerald Green", "Crimson Red", "Pastel Pink", "Midnight Black", "Mustard Gold", "Maroon", "Teal Blue", "Lavender", "Wine Red", "Sunshine Yellow", "Sky Blue", "Rose Pink", "Olive Green"], imgs: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'lehenga-blouse', prefix: 'LEH', basePrice: 7999, names: [
            "Pastel Pink Designer Lehenga & Blouse Set", "Gold Embroidered Red Bridal Lehenga", "Royal Blue Heavy Sequin Lehenga Set",
            "Emerald Green Velvet Bridal Lehenga", "Mustard Yellow Sangeet Lehenga Choli", "Crimson Red Zardosi Lehenga Set",
            "Midnight Black Gothic Designer Lehenga", "Wine Red Silk Bridal Lehenga Set", "Lavender Net Floral Lehenga Choli",
            "Teal Blue Mirror Work Lehenga Set", "Peach Organza Flared Lehenga Set", "Sky Blue Threadwork Lehenga Set",
            "Marigold Yellow Festive Lehenga", "Rose Gold Silk Velvet Lehenga", "Bottle Green Banarasi Lehenga Set"
        ], colors: ["Pastel Pink", "Golden Red", "Royal Blue", "Emerald Green", "Mustard Yellow", "Crimson Red", "Midnight Black", "Wine Red", "Lavender", "Teal Blue", "Peach Pink", "Sky Blue", "Marigold Yellow", "Rose Gold", "Bottle Green"], imgs: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'shapewear', prefix: 'SHP', basePrice: 899, names: [
            "Mermaid Fit Beige Saree Shapewear skirt", "Scarlet Red Seamless Saree Shapewear", "Royal Blue Compression Saree Shapewear",
            "Midnight Black Mermaid Silhouette Shapewear", "Emerald Green Saree Shapewear Skirt", "Nude Tan Smooth Compression Shapewear",
            "Golden Yellow Mermaid Shapewear", "Maroon Side-Slit Saree Shapewear", "Pastel Pink Comfort Shapewear Skirt",
            "Lavender Seamless Compression Shapewear", "Teal Blue Saree Shapewear Skirt", "Wine Red Mermaid Fit Shapewear",
            "Sky Blue Compression Saree Skirt", "Off-White High-Waist Shapewear", "Rose Gold Satin Saree Shapewear"
        ], colors: ["Nude Beige", "Scarlet Red", "Royal Blue", "Midnight Black", "Emerald Green", "Nude Tan", "Golden Yellow", "Deep Maroon", "Pastel Pink", "Lavender", "Teal Blue", "Wine Red", "Sky Blue", "Off-White", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1549064482-6779ba3292fe?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'maggam-work-blouse-pieces', prefix: 'MAG', basePrice: 3499, names: [
            "Emerald Green Maggam Work Blouse Piece", "Royal Blue Peacock Maggam Work Piece", "Crimson Red Heavy Zardosi Maggam Piece",
            "Mustard Gold Bridal Maggam Blouse Piece", "Midnight Black Hand Embroidered Maggam Piece", "Pastel Pink Floral Stone Maggam Piece",
            "Wine Red Grand Bridal Maggam Material", "Teal Blue Mirror & Zari Maggam Piece", "Lavender Designer Cutwork Maggam Piece",
            "Marigold Yellow Traditional Maggam Piece", "Bottle Green Temple Design Maggam Piece", "Peach Silk Kundan Maggam Piece",
            "Sky Blue Sequin Maggam Blouse Piece", "Rose Gold Heavy Maggam Fabric", "Off-White Raw Silk Maggam Piece"
        ], colors: ["Emerald Green", "Royal Blue", "Crimson Red", "Mustard Gold", "Midnight Black", "Pastel Pink", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Bottle Green", "Peach Pink", "Sky Blue", "Rose Gold", "Off-White"], imgs: [
            "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'computer-work-blouse-pieces', prefix: 'COM', basePrice: 1499, names: [
            "Ruby Red Computer Embroidered Blouse Piece", "Royal Blue Machine Threadwork Blouse Piece", "Emerald Green Precision Computerized Piece",
            "Golden Yellow Zari Computer Work Piece", "Midnight Black Velvet Machine Worked Piece", "Pastel Pink Multi-Needle Computer Piece",
            "Maroon Bridal Machine Embroidery Piece", "Teal Blue Geometric Computerized Piece", "Lavender Floral Computer Work Piece",
            "Wine Red Silk Machine Worked Blouse", "Peach Organza Computerized Blouse Piece", "Sky Blue Satin Computer Work Piece",
            "Bottle Green Computer Embroidered Piece", "Rose Gold Metallic Computerized Blouse", "Off-White Brocade Computer Work Piece"
        ], colors: ["Ruby Red", "Royal Blue", "Emerald Green", "Golden Yellow", "Midnight Black", "Pastel Pink", "Deep Maroon", "Teal Blue", "Lavender", "Wine Red", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold", "Off-White"], imgs: [
            "https://images.unsplash.com/photo-1605497746444-ac9dbd53a474?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'dupatta', prefix: 'DUP', basePrice: 999, names: [
            "Mustard Gold Banarasi Silk Zari Dupatta", "Royal Blue Heavy Silk Woven Dupatta", "Crimson Red Bridal Net Dupatta",
            "Emerald Green Organza Printed Dupatta", "Pastel Pink Phulkari Embroidery Dupatta", "Midnight Black Velvet Zari Dupatta",
            "Wine Red Bandhani Silk Dupatta", "Teal Blue Chiffon Border Dupatta", "Lavender Gota Patti Net Dupatta",
            "Marigold Yellow Banarasi Zari Dupatta", "Peach Silk Floral Stole Dupatta", "Sky Blue Georgette Sequence Dupatta",
            "Bottle Green Brocade Dupatta", "Rose Gold Tissue Silk Dupatta", "Off-White Chanderi Cotton Dupatta"
        ], colors: ["Mustard Gold", "Royal Blue", "Crimson Red", "Emerald Green", "Pastel Pink", "Midnight Black", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold", "Off-White"], imgs: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'chunni', prefix: 'CHU', basePrice: 349, names: [
            "Multicolor Printed Chiffon Chunni Scarf", "Crimson Red Gota Border Chunni", "Royal Blue Bandhani Cotton Chunni",
            "Emerald Green Net Chunni", "Pastel Pink Printed Silk Chunni Scarf", "Mustard Yellow Crushed Chiffon Chunni",
            "Midnight Black Sequence Border Chunni", "Wine Red Heavy Border Chunni", "Teal Blue Lightweight Scarf Chunni",
            "Lavender Pom-Pom Lace Chunni", "Peach Floral Digital Print Chunni", "Sky Blue Cotton Chunni Scarf",
            "Bottle Green Silk Blend Chunni", "Rose Pink Embroidered Chunni", "Off-White Dupion Silk Chunni"
        ], colors: ["Multicolor", "Crimson Red", "Royal Blue", "Emerald Green", "Pastel Pink", "Mustard Yellow", "Midnight Black", "Wine Red", "Teal Blue", "Lavender", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Pink", "Off-White"], imgs: [
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'cut-piece-fabric', prefix: 'FAB', basePrice: 599, names: [
            "Pure Raw Silk Blue Cut Piece Fabric", "Crimson Red Raw Silk Cut Piece", "Emerald Green Pure Cotton Cut Piece",
            "Mustard Gold Brocade Fabric Cut Piece", "Midnight Black Velvet Cut Piece Fabric", "Pastel Pink Net Fabric Cut Piece",
            "Maroon Organza Cut Piece Fabric", "Teal Blue Chiffon Cut Piece Fabric", "Lavender Linen Fabric Cut Piece",
            "Marigold Yellow Cotton Cut Piece", "Bottle Green Raw Silk Cut Piece", "Peach Silk Satin Cut Piece Fabric",
            "Sky Blue Rayon Cut Piece", "Rose Gold Zari Fabric Cut Piece", "Off-White Khadi Cotton Cut Piece"
        ], colors: ["Ocean Blue", "Crimson Red", "Emerald Green", "Mustard Gold", "Midnight Black", "Pastel Pink", "Deep Maroon", "Teal Blue", "Lavender", "Marigold Yellow", "Bottle Green", "Peach Pink", "Sky Blue", "Rose Gold", "Off-White"], imgs: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'dress-material', prefix: 'MAT', basePrice: 1299, names: [
            "Unstitched Cotton Salwar Dress Material", "Royal Blue Silk Unstitched Suit Pack", "Emerald Green Jaipuri Print Dress Material",
            "Crimson Red Chanderi Unstitched Dress Material", "Mustard Yellow Gota Patti Dress Material", "Midnight Black Velvet Suit Material",
            "Pastel Pink Organza Unstitched Suit Pack", "Wine Red Bandhani Salwar Dress Material", "Teal Blue Cotton Printed Suit Pack",
            "Lavender Chikankari Dress Material", "Marigold Yellow Silk Dress Material", "Peach Chiffon Unstitched Suit Pack",
            "Sky Blue Printed Cotton Dress Material", "Bottle Green Embroidered Suit Material", "Rose Gold Brocade Salwar Dress Material"
        ], colors: ["Cream / Indigo Blue", "Royal Blue", "Emerald Green", "Crimson Red", "Mustard Yellow", "Midnight Black", "Pastel Pink", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'lehenga-fabric', prefix: 'LFB', basePrice: 4999, names: [
            "Gold Embroidered Bridal Lehenga Fabric", "Royal Blue Velvet Lehenga Panel Fabric", "Emerald Green Raw Silk Lehenga Fabric",
            "Crimson Red Heavy Zardosi Lehenga Panel", "Mustard Gold Banarasi Lehenga Fabric", "Midnight Black Sequence Lehenga Panel",
            "Pastel Pink Net Floral Lehenga Fabric", "Wine Red Satin Silk Lehenga Material", "Teal Blue Mirror Work Lehenga Panel",
            "Lavender Organza Lehenga Fabric", "Marigold Yellow Threadwork Lehenga Panel", "Peach Silk Brocade Lehenga Fabric",
            "Sky Blue Embroidered Lehenga Panel", "Bottle Green Velvet Lehenga Fabric", "Rose Gold Metallic Lehenga Panel"
        ], colors: ["Golden Red", "Royal Blue", "Emerald Green", "Crimson Red", "Mustard Gold", "Midnight Black", "Pastel Pink", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'nighty', prefix: 'NIT', basePrice: 899, names: [
            "Classic Maroon Floral Cotton Nighty", "Royal Blue Printed Pure Cotton Nighty", "Emerald Green Comfortable Daily Nighty",
            "Pastel Pink Soft Cotton Nightdress", "Crimson Red Zip Front Cotton Nighty", "Midnight Black Printed Lounge Nighty",
            "Mustard Yellow Breathable Cotton Nighty", "Wine Red Premium Hosiery Nighty", "Teal Blue Sleeveless Summer Nighty",
            "Lavender Floral Print Cotton Nighty", "Marigold Yellow Soft Cotton Nighty", "Peach Comfort Fit Nightdress",
            "Sky Blue Cotton Nighty Pack", "Bottle Green Printed Nightwear", "Rose Pink Satin Nighty Gown"
        ], colors: ["Maroon / Blue", "Royal Blue", "Emerald Green", "Pastel Pink", "Crimson Red", "Midnight Black", "Mustard Yellow", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Pink"], imgs: [
            "https://images.unsplash.com/photo-1562572159-4ebcd318f4dd?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'lace-hangings', prefix: 'LAC', basePrice: 299, names: [
            "Gold Zari Border Lace Trim Accessories", "Crimson Red Maggam Latkan Tassel Hangings", "Royal Blue Velvet Border Lace Trim",
            "Emerald Green Gota Patti Border Lace", "Mustard Gold Bead Hanging Tassels", "Midnight Black Sequence Lace Trim",
            "Pastel Pink Designer Border Lace", "Wine Red Heavy Zari Border Trim", "Teal Blue Mirror Work Border Lace",
            "Lavender Floral Embroidered Lace Trim", "Marigold Yellow Pom-Pom Lace Trim", "Peach Silk Border Lace Trim",
            "Sky Blue Pearl Hanging Tassels", "Bottle Green Maggam Latkan Accessories", "Rose Gold Metallic Lace Trim Roll"
        ], colors: ["Metallic Gold", "Crimson Red", "Royal Blue", "Emerald Green", "Mustard Gold", "Midnight Black", "Pastel Pink", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'kids', prefix: 'KID', basePrice: 1899, names: [
            "Silk Pattu Langa Kids Lehenga Set", "Crimson Red Kids Festive Anarkali Frock", "Royal Blue Boys Traditional Kurta Set",
            "Emerald Green Girls Lehenga Choli", "Pastel Pink Kids Party Frock", "Mustard Yellow Kids Pattu Langa Set",
            "Midnight Black Kids Velvet Sherwani", "Wine Red Girls Silk Lehenga Set", "Teal Blue Kids Kurti Pyjama Set",
            "Lavender Girls Flower Dress", "Marigold Yellow Kids Ethnic Suit", "Peach Kids Silk Frock",
            "Sky Blue Traditional Kids Wear", "Bottle Green Girls Pattu Langa", "Rose Pink Kids Dhoti Kurta Set"
        ], colors: ["Maroon & Golden Yellow", "Crimson Red", "Royal Blue", "Emerald Green", "Pastel Pink", "Mustard Yellow", "Midnight Black", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Pink"], imgs: [
            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80"
        ]},
        { id: 'retail-collection', prefix: 'RET', basePrice: 1999, names: [
            "Boutique Fashion Retail Kurti Display", "Retail Special Banarasi Silk Saree", "Retail Collection Georgette 3-Piece Suit",
            "Retail Ready Maggam Blouse Piece", "Retail Designer Anarkali Frock", "Retail Wholesale Cotton Dress Material",
            "Retail Silk Petticoats Bulk Pack", "Retail Festive Kids Pattu Langa", "Retail Premium Shapewear Skirt",
            "Retail Designer Dupatta Collection", "Retail Computer Worked Blouse Pieces", "Retail Peplum Fusion Tops",
            "Retail Traditional Half Saree Set", "Retail Bridal Lehenga Fabric", "Retail Silk Cut Piece Roll"
        ], colors: ["Multicolor / Retail", "Royal Blue", "Emerald Green", "Crimson Red", "Mustard Gold", "Midnight Black", "Pastel Pink", "Wine Red", "Teal Blue", "Lavender", "Marigold Yellow", "Peach Pink", "Sky Blue", "Bottle Green", "Rose Gold"], imgs: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
        ]}
    ];

    const result = [];
    let globalId = 1;

    categories.forEach(cat => {
        cat.names.forEach((name, i) => {
            const price = cat.basePrice + (i * 250);
            const priceOld = Math.round(price * 1.6);
            const imgIndex = i % cat.imgs.length;
            const imgUrl = cat.imgs[imgIndex];
            
            result.push({
                id: globalId,
                sku: `SBF-${cat.prefix}-${String(i + 1).padStart(3, '0')}`,
                name: name,
                category: cat.id,
                price: price,
                priceOld: priceOld,
                rating: parseFloat((4.4 + (i % 6) * 0.1).toFixed(1)),
                reviewsCount: 12 + i * 3,
                description: `High quality boutique ${name}. Authentic fabric and superior crafting curated by Sowbhagya.`,
                fabric: "Premium Quality Weaves",
                work: "Artisan Handcrafted & Stitched",
                color: cat.colors[i % cat.colors.length],
                sizes: cat.id === 'sarees' || cat.id === 'petticoats' || cat.id === 'dupatta' || cat.id === 'chunni' ? ["Free Size"] : ["S", "M", "L", "XL", "XXL"],
                image: imgUrl,
                gallery: [imgUrl],
                stock: 15 + i * 2,
                featured: i < 3,
                bestSeller: i % 4 === 0,
                retail: cat.id === 'retail-collection' || i % 3 === 0
            });
            globalId++;
        });
    });

    return result;
}

const SEED_PRODUCTS = buildCatalogProducts();

// Seed Categories detail meta (for banners and descriptions)
const CATEGORY_META = {
    sarees: { title: "Exclusive Sarees", subtitle: "Banarasi, Kanchipuram & Designer Organza pieces", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80" },
    frocks: { title: "Elegant Frocks", subtitle: "Anarkali, Georgette & western cuts", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80" },
    blouses: { title: "Readymade Blouses", subtitle: "Stitched designer blouses ready to wear", img: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&auto=format&fit=crop&q=80" },
    kurti: { title: "Kurti Tops", subtitle: "Comfortable daily wear and printed Tunics", img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80" },
    "3-piece-sets": { title: "3 Piece Sets", subtitle: "Grand Kurti sets with heavy dupattas", img: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&auto=format&fit=crop&q=80" },
    "half-sarees": { title: "Traditional Half Sarees", subtitle: "South Indian traditional langa voni sets", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80" },
    petticoats: { title: "Saree Petticoats", subtitle: "High-grade cotton and satin underskirts", img: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=80" },
    "peplum-tops": { title: "Peplum Tops", subtitle: "Indo-western fusion short tops", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" },
    "lehenga-blouse": { title: "Lehenga & Blouse Sets", subtitle: "Premium bridal and festive Lehenga Cholis", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80" },
    shapewear: { title: "Saree Shapewear", subtitle: "Premium mermaid silhouette side-slit shapewear", img: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=80" },
    "maggam-work-blouse-pieces": { title: "Maggam Work Blouses", subtitle: "Stunning hand-crafted Zardozi blouse materials", img: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&auto=format&fit=crop&q=80" },
    "computer-work-blouse-pieces": { title: "Computer Embroidery Blouses", subtitle: "Precision machine worked heavy silk materials", img: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&auto=format&fit=crop&q=80" },
    dupatta: { title: "Zari Dupattas", subtitle: "Silk, Net and chiffon matching stoles", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80" },
    chunni: { title: "Chunnis & Scarves", subtitle: "Vibrant ethnic styling additions", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80" },
    "cut-piece-fabric": { title: "Cut Piece Fabric", subtitle: "Premium raw cotton and silk measurements", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80" },
    "dress-material": { title: "Unstitched Dress Materials", subtitle: "Create your own customized Punjabi suites", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80" },
    "lehenga-fabric": { title: "Lehenga Fabrics", subtitle: "Bespoke fabrics for custom bridal designs", img: "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=800&auto=format&fit=crop&q=80" },
    nighty: { title: "Comfort Nighties", subtitle: "Premium quality cotton night wear", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80" },
    "lace-hangings": { title: "Lace & Hangings", subtitle: "Maggam designer borders and hangings accessories", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" },
    women: { title: "Women's Fashion Hub", subtitle: "Complete traditional, designer, and boutique collection", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80" },
    kids: { title: "Kids Ethnic Wear", subtitle: "Festive lehengas, kurtas, and traditional dresses for children", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80" },
    "retail-collection": { title: "Retail Collections", subtitle: "In-store fashion favorites ready for shipment", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80" }
};

// Seed test reviews
const SEED_REVIEWS = [
    { name: "Lakshmi Priya", rating: 5, date: "24-Jul-2026", comment: "The Maggam work blouse is extremely beautiful. Very detailed finish. Fully satisfied!" },
    { name: "Anitha Reddy", rating: 4, date: "15-Jul-2026", comment: "Saree looks very premium. Color is a shade darker than picture but quality is outstanding." },
    { name: "Srinivas Rao", rating: 5, date: "10-Jul-2026", comment: "Ordered Kids Lehenga for my daughter. Fitting is absolutely perfect and cotton inner is super soft." }
];

// Seed Q&As
const SEED_QA = [
    { question: "Can we get custom sizes for the blouses?", answer: "Yes! Sowbhagya can customize the blouse fitting if you provide measurements over WhatsApp." },
    { question: "Is COD available for Mahaboob Nagar local delivery?", answer: "Yes, COD is fully supported. Local deliveries are fulfilled in 24 hours." }
];

// State Manager Helper Class
class StoreState {
    static get(key, fallback) {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    }
    static set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
}

// Initialise Database state — reset products if version is outdated
const storedVersion = localStorage.getItem('sbf_seed_version');
if (storedVersion !== SEED_VERSION) {
    localStorage.removeItem(STATE_KEYS.PRODUCTS);
    localStorage.setItem('sbf_seed_version', SEED_VERSION);
}
let products = StoreState.get(STATE_KEYS.PRODUCTS, SEED_PRODUCTS);
let orders = StoreState.get(STATE_KEYS.ORDERS, []);
let cart = StoreState.get(STATE_KEYS.CART, []);
let wishlist = StoreState.get(STATE_KEYS.WISHLIST, []);
let activeSession = StoreState.get(STATE_KEYS.SESSION, null);
let announcement = StoreState.get(STATE_KEYS.ANNOUNCEMENT, "⚡ FESTIVAL SEASON SALE IS LIVE: USE CODE \"SBFEST20\" FOR 20% OFF!");

// Save states back
function syncState() {
    StoreState.set(STATE_KEYS.PRODUCTS, products);
    StoreState.set(STATE_KEYS.ORDERS, orders);
    StoreState.set(STATE_KEYS.CART, cart);
    StoreState.set(STATE_KEYS.WISHLIST, wishlist);
    StoreState.set(STATE_KEYS.SESSION, activeSession);
    StoreState.set(STATE_KEYS.ANNOUNCEMENT, announcement);
    
    // Update Header Badges
    document.getElementById('cart-badge-count').textContent = cart.length;
    document.getElementById('wishlist-badge-count').textContent = wishlist.length;
}


// --- 2. CLIENT-SIDE ROUTER ENGINE ---
const views = {
    home: document.getElementById('view-home'),
    category: document.getElementById('view-category'),
    product: document.getElementById('view-product'),
    cart: document.getElementById('view-cart'),
    checkout: document.getElementById('view-checkout'),
    success: document.getElementById('view-order-success'),
    tracking: document.getElementById('view-tracking'),
    dashboard: document.getElementById('view-dashboard'),
    admin: document.getElementById('view-admin'),
    auth: document.getElementById('view-auth'),
    contact: document.getElementById('view-contact'),
    faq: document.getElementById('view-faq')
};

function switchView(targetViewId) {
    // Hide all
    Object.values(views).forEach(view => {
        if (view) view.classList.remove('active');
    });
    
    // Show active
    const activeView = views[targetViewId];
    if (activeView) {
        activeView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Close mobile drawers if active
    closeMobileDrawer();
}

function handleRouting() {
    const hash = window.location.hash || '#/home';
    const parts = hash.split('/');
    
    const primaryRoute = parts[1] || 'home';
    const parameter = parts[2] || '';
    const subParam = parts[3] || '';
    
    // Header class on scroll
    document.getElementById('main-header').classList.remove('scrolled');
    
    switch (primaryRoute) {
        case 'home':
            switchView('home');
            renderHomeContents();
            triggerStatisticsCountUp();
            setTimeout(initWordRevealAnimations, 100);
            break;
            
        case 'category':
            switchView('category');
            renderCategoryPage(parameter);
            setTimeout(initWordRevealAnimations, 100);
            break;
            
        case 'product':
            switchView('product');
            renderProductDetailPage(parseInt(parameter));
            break;
            
        case 'cart':
            switchView('cart');
            renderCartPage();
            break;
            
        case 'checkout':
            if (cart.length === 0) {
                showToast("Your cart is empty! Add products first.", "error");
                window.location.hash = '#/cart';
                return;
            }
            switchView('checkout');
            renderCheckoutPage();
            break;
            
        case 'success':
            switchView('success');
            const orderId = new URLSearchParams(window.location.search || '').get('id') || parameter;
            document.getElementById('success-order-id-label').textContent = orderId || "SBF-10001";
            break;
            
        case 'tracking':
            switchView('tracking');
            renderTrackingPage(parameter || subParam);
            break;
            
        case 'dashboard':
            if (!activeSession) {
                showToast("Please sign in to view your dashboard", "info");
                window.location.hash = '#/auth/login';
                return;
            }
            switchView('dashboard');
            renderCustomerDashboard(parameter);
            break;
            
        case 'admin':
            showAdminGate(() => {
                switchView('admin');
                renderAdminPanel(parameter);
            });
            break;
            
        case 'auth':
            switchView('auth');
            renderAuthPage(parameter);
            break;
            
        case 'contact':
            switchView('contact');
            bindVisitorForm();
            break;
            
        case 'faq':
            switchView('faq');
            renderFAQPage();
            break;
            
        default:
            switchView('home');
            break;
    }
    
    // Toggle active link states
    document.querySelectorAll('#main-nav-menu a').forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.parentElement.classList.add('active');
        }
    });

    // Update login status dropdown links
    updateAuthButtonsUI();
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', () => {
    // Shimmer simulation & Loader dismiss
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.style.display = 'none', 600);
        }
    }, 1500);
    
    syncState();
    handleRouting();
});


// --- 3. TOAST NOTIFICATIONS TRIGGER ---
function showToast(msg, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = "info";
    if (type === "success") icon = "check-circle";
    if (type === "error") icon = "x-circle";
    
    toast.innerHTML = `<i data-lucide="${icon}" style="width:16px;"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => toast.classList.add('active'), 50);
    
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}


// --- 4. RENDER HOMEPAGE VIEW CONTENTS ---
let heroIndex = 0;
let heroInterval = null;

function renderHomeContents() {
    // Announcement Bar (Phone number removed per image copy 22)
    document.querySelector('.top-bar-slider').textContent = announcement;

    // Setup Category Circle items (21 categories + View All matching requirements)
    const catSlider = document.getElementById('home-category-slider');
    if (catSlider) {
        catSlider.innerHTML = '';
        
        const homeCategories = [
            { key: 'sarees', label: 'Sarees' },
            { key: 'frocks', label: 'Frocks' },
            { key: 'blouses', label: 'Blouses' },
            { key: 'kurti', label: 'Kurtis' },
            { key: '3-piece-sets', label: '3 Piece Sets' },
            { key: 'half-sarees', label: 'Half Sarees' },
            { key: 'petticoats', label: 'Petticoats' },
            { key: 'peplum-tops', label: 'Peplum Tops' },
            { key: 'lehenga-blouse', label: 'Lehenga & Blouse' },
            { key: 'shapewear', label: 'Shapewear' },
            { key: 'maggam-work-blouse-pieces', label: 'Maggam Work Blouse Pieces' },
            { key: 'computer-work-blouse-pieces', label: 'Computer Work Blouse Pieces' },
            { key: 'dupatta', label: 'Dupattas' },
            { key: 'chunni', label: 'Chunnis' },
            { key: 'cut-piece-fabric', label: 'Cut Piece Fabrics' },
            { key: 'dress-material', label: 'Dress Materials' },
            { key: 'lehenga-fabric', label: 'Lehenga Fabrics' },
            { key: 'nighty', label: 'Nighties' },
            { key: 'lace-hangings', label: 'Lace & Hangings' },
            { key: 'kids', label: 'Kids Collection' },
            { key: 'retail-collection', label: 'Retail Collection' }
        ];

        homeCategories.forEach(item => {
            const cat = CATEGORY_META[item.key] || { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300' };
            const card = document.createElement('a');
            card.href = `#/category/${item.key}`;
            card.className = "category-card";
            card.innerHTML = `
                <div class="category-circle">
                    <img src="${cat.img}" alt="${item.label}">
                </div>
                <span>${item.label}</span>
            `;
            catSlider.appendChild(card);
        });

        // 22nd Card: View All Categories
        const viewAllCard = document.createElement('a');
        viewAllCard.href = `#/category/women`;
        viewAllCard.className = "category-card";
        viewAllCard.innerHTML = `
            <div class="category-viewall-card">
                <i data-lucide="layout-grid"></i>
            </div>
            <span style="color:var(--color-pink-main);font-weight:700;">View All Categories &gt;</span>
        `;
        catSlider.appendChild(viewAllCard);
    }

    // Setup Hero banners autoplay
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('hero-slider-dots');
    dotsContainer.innerHTML = '';
    
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            heroIndex = idx;
            updateHeroSlider();
        });
        dotsContainer.appendChild(dot);
    });

    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        heroIndex = (heroIndex + 1) % slides.length;
        updateHeroSlider();
    }, 6000);

    // Seeding trending section
    const trendingGrid = document.getElementById('home-trending-products');
    trendingGrid.innerHTML = '';
    products.filter(p => p.featured).slice(0, 4).forEach(p => {
        trendingGrid.appendChild(createProductCardElement(p));
    });

    // Seeding Best Sellers section
    const bestGrid = document.getElementById('home-bestseller-products');
    bestGrid.innerHTML = '';
    products.filter(p => p.bestSeller).slice(0, 4).forEach(p => {
        bestGrid.appendChild(createProductCardElement(p));
    });

    // Seeding Testimonials
    const testSlider = document.getElementById('home-testimonial-slider');
    testSlider.innerHTML = '';
    SEED_REVIEWS.forEach((rev, idx) => {
        const slide = document.createElement('div');
        slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <span class="quote-icon">“</span>
            <p class="testimonial-text">${rev.comment}</p>
            <div style="font-size:1.5rem;color:var(--color-warning);margin-bottom:15px;">★★★★★</div>
            <h4 class="testimonial-name">${rev.name}</h4>
            <span class="testimonial-role">Verified Purchase • ${rev.date}</span>
        `;
        testSlider.appendChild(slide);
    });
    
    // Add slide arrows
    if (!document.querySelector('.testimonial-arrows')) {
        const navArrows = document.createElement('div');
        navArrows.className = "testimonial-arrows";
        navArrows.innerHTML = `
            <button class="testimonial-arrow" id="btn-test-prev"><i data-lucide="chevron-left"></i></button>
            <button class="testimonial-arrow" id="btn-test-next"><i data-lucide="chevron-right"></i></button>
        `;
        testSlider.appendChild(navArrows);
        
        let testIdx = 0;
        document.getElementById('btn-test-prev').addEventListener('click', () => {
            const list = document.querySelectorAll('.testimonial-slide');
            list[testIdx].classList.remove('active');
            testIdx = (testIdx - 1 + list.length) % list.length;
            list[testIdx].classList.add('active');
        });
        document.getElementById('btn-test-next').addEventListener('click', () => {
            const list = document.querySelectorAll('.testimonial-slide');
            list[testIdx].classList.remove('active');
            testIdx = (testIdx + 1) % list.length;
            list[testIdx].classList.add('active');
        });
    }

    // Seeding Instagram gallery
    const instaGrid = document.getElementById('home-instagram-grid');
    instaGrid.innerHTML = '';
    const instaPics = [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=60",
        "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&q=60",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=60",
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=60",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=60",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=60"
    ];
    instaPics.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = "instagram-item";
        item.innerHTML = `
            <img src="${url}" alt="Instagram Post ${index+1}">
            <div class="instagram-overlay">
                <i data-lucide="instagram"></i>
            </div>
        `;
        instaGrid.appendChild(item);
    });

    lucide.createIcons();
}

// Typing mode count-up animation for trusted numbers & statistics
function triggerStatisticsCountUp() {
    const stats = document.querySelectorAll('.count-up-stat');
    stats.forEach(el => {
        const targetVal = parseFloat(el.getAttribute('data-val') || '0');
        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = targetVal * easeProgress;

            if (decimals > 0) {
                el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
            } else {
                el.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    });
}

function updateHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        dots[idx].classList.remove('active');
        if (idx === heroIndex) {
            slide.classList.add('active');
            dots[idx].classList.add('active');
        }
    });
}

document.getElementById('hero-slider-prev').addEventListener('click', () => {
    const slides = document.querySelectorAll('.hero-slide');
    heroIndex = (heroIndex - 1 + slides.length) % slides.length;
    updateHeroSlider();
});

document.getElementById('hero-slider-next').addEventListener('click', () => {
    const slides = document.querySelectorAll('.hero-slide');
    heroIndex = (heroIndex + 1) % slides.length;
    updateHeroSlider();
});


// --- 5. DYNAMIC PRODUCT CARD CREATION ---
function createProductCardElement(p) {
    const card = document.createElement('div');
    card.className = "product-card";
    
    const discPercent = p.priceOld ? Math.round(((p.priceOld - p.price) / p.priceOld) * 100) : 0;
    const isWish = wishlist.includes(p.id) ? 'active' : '';
    
    card.innerHTML = `
        <div class="product-card-media">
            <span class="product-badge new-arrival">NEW</span>
            <button class="wishlist-btn-card ${isWish}" data-id="${p.id}" title="Add to Wishlist">
                <i data-lucide="heart" style="width:16px;"></i>
            </button>
            <a href="#/product/${p.id}" style="display:block;width:100%;height:100%;">
                <img src="${p.image}" alt="${p.name}" class="product-card-img"
                    onerror="this.src='${CATEGORY_META[p.category]?.img || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600'}';">
            </a>
        </div>
        <div class="product-card-info">
            <a href="#/product/${p.id}"><h3 class="product-card-title-multi">${p.name}</h3></a>
            <div class="product-card-rating">
                <i data-lucide="star" style="fill:#f59e0b;stroke:none;width:12px;height:12px;"></i>
                <i data-lucide="star" style="fill:#f59e0b;stroke:none;width:12px;height:12px;"></i>
                <i data-lucide="star" style="fill:#f59e0b;stroke:none;width:12px;height:12px;"></i>
                <i data-lucide="star" style="fill:#f59e0b;stroke:none;width:12px;height:12px;"></i>
                <i data-lucide="star" style="fill:#f59e0b;stroke:none;width:12px;height:12px;"></i>
                <span style="margin-left:2px;color:#777;font-size:0.75rem;">(${p.reviewsCount})</span>
            </div>
            <div class="product-card-price-row">
                ${p.priceOld ? `<span class="price-old">₹${p.priceOld.toLocaleString()}</span>` : ''}
                <span class="price-current">₹${p.price.toLocaleString()}</span>
                ${discPercent > 0 ? `<span class="price-discount-pill">${discPercent}% OFF</span>` : ''}
            </div>
            <button class="btn-card-addtocart add-to-cart-direct" data-id="${p.id}">
                <i data-lucide="shopping-bag"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}


// --- 6. CATEGORY VIEW CONTROLLER ---
function renderCategoryPage(categoryKey) {
    const meta = CATEGORY_META[categoryKey] || { title: "Exclusive Wardrobe", subtitle: "Curated styles by SB Fashions", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200" };
    
    document.getElementById('category-page-title').textContent = meta.title;
    document.getElementById('category-page-subtitle').textContent = meta.subtitle;
    document.getElementById('category-page-banner').style.backgroundImage = `url('${meta.img}')`;
    
    // Handle price filtering and filters change
    const minInput = document.getElementById('price-filter-min');
    const maxInput = document.getElementById('price-filter-max');
    const stockChk = document.getElementById('stock-filter-instock');
    const sortSelect = document.getElementById('sort-select');
    
    function applyFilters() {
        const minVal = parseInt(minInput.value) || 0;
        const maxVal = parseInt(maxInput.value) || 99999;
        const onlyStock = stockChk.checked;
        const selectedSort = sortSelect.value;
        
        // Filter by category
        let list = products.filter(p => {
            if (categoryKey === 'women') {
                return p.category !== 'kids'; // broad women collection
            }
            return p.category === categoryKey;
        });
        
        // Filter by price
        list = list.filter(p => p.price >= minVal && p.price <= maxVal);
        
        // Filter by stock
        if (onlyStock) {
            list = list.filter(p => p.stock > 0);
        }
        
        // Filter by size checkboxes
        const sizeChks = document.querySelectorAll('input[name="filter-size"]:checked');
        if (sizeChks.length > 0) {
            const activeSizes = Array.from(sizeChks).map(cb => cb.value);
            list = list.filter(p => p.sizes.some(sz => activeSizes.includes(sz) || sz === "Free Size"));
        }
        
        // Sorting
        if (selectedSort === 'price-low') {
            list.sort((a,b) => a.price - b.price);
        } else if (selectedSort === 'price-high') {
            list.sort((a,b) => b.price - a.price);
        } else if (selectedSort === 'popular') {
            list.sort((a,b) => b.rating - a.rating);
        } else if (selectedSort === 'discount') {
            list.sort((a,b) => {
                const discA = Math.round(((a.priceOld - a.price) / a.priceOld) * 100);
                const discB = Math.round(((b.priceOld - b.price) / b.priceOld) * 100);
                return discB - discA;
            });
        } else {
            // Newest default (highest ID)
            list.sort((a,b) => b.id - a.id);
        }
        
        // Render
        const grid = document.getElementById('category-product-grid');
        grid.innerHTML = '';
        document.getElementById('category-listing-count').textContent = list.length;
        
        if (list.length === 0) {
            document.getElementById('category-empty-state').classList.remove('hidden');
        } else {
            document.getElementById('category-empty-state').classList.add('hidden');
            list.forEach(p => {
                grid.appendChild(createProductCardElement(p));
            });
        }
        
        lucide.createIcons();
    }
    
    // Bind Event Listeners (Clear existing to prevent multiple registrations)
    minInput.oninput = applyFilters;
    maxInput.oninput = applyFilters;
    stockChk.onchange = applyFilters;
    sortSelect.onchange = applyFilters;
    document.querySelectorAll('input[name="filter-size"]').forEach(cb => cb.onchange = applyFilters);
    
    document.getElementById('btn-clear-filters').onclick = () => {
        minInput.value = 0;
        maxInput.value = 15000;
        stockChk.checked = false;
        document.querySelectorAll('input[name="filter-size"]').forEach(cb => cb.checked = false);
        applyFilters();
    };
    
    // Initial run
    applyFilters();
}


// --- 7. PRODUCT DETAIL VIEW CONTROLLER ---
let activeDetailSize = "";
let activeDetailColor = "";

function renderProductDetailPage(prodId) {
    const p = products.find(prod => prod.id === prodId);
    if (!p) {
        showToast("Product not found!", "error");
        window.location.hash = '#/home';
        return;
    }
    
    // Title & details
    document.getElementById('detail-breadcrumb-name').textContent = p.name;
    document.getElementById('detail-breadcrumb-cat').textContent = p.category.toUpperCase();
    document.getElementById('detail-breadcrumb-cat').href = `#/category/${p.category}`;
    document.getElementById('detail-product-title').textContent = p.name;
    document.getElementById('detail-product-cat').textContent = p.category.replace(/-/g, ' ');
    document.getElementById('detail-product-sku').textContent = `SKU: ${p.sku}`;
    document.getElementById('detail-product-desc').textContent = p.description;
    
    // Prices
    document.getElementById('detail-price-current').textContent = `₹${p.price.toLocaleString()}`;
    if (p.priceOld) {
        document.getElementById('detail-price-old').style.display = 'inline';
        document.getElementById('detail-price-old').textContent = `₹${p.priceOld.toLocaleString()}`;
        const disc = Math.round(((p.priceOld - p.price) / p.priceOld) * 100);
        document.getElementById('detail-price-discount').textContent = `${disc}% OFF`;
        document.getElementById('detail-price-discount').style.display = 'inline-block';
    } else {
        document.getElementById('detail-price-old').style.display = 'none';
        document.getElementById('detail-price-discount').style.display = 'none';
    }
    
    // Stock status badge
    const badge = document.getElementById('detail-stock-badge');
    if (p.stock > 0) {
        badge.textContent = `In Stock (${p.stock} Left)`;
        badge.className = "stock-status-badge in-stock";
    } else {
        badge.textContent = "Out of Stock";
        badge.className = "stock-status-badge out-stock";
    }
    
    // Ratings
    document.getElementById('detail-rating-score').textContent = p.rating;
    document.getElementById('detail-reviews-count').textContent = `(${p.reviewsCount} Reviews)`;
    document.getElementById('detail-reviews-tab-count').textContent = p.reviewsCount;
    document.getElementById('reviews-avg-score').textContent = p.rating;
    document.getElementById('reviews-total-num').textContent = p.reviewsCount;
    
    // Render images gallery
    const mainImg = document.getElementById('detail-main-image');
    mainImg.src = p.image;
    
    const thumbsRow = document.getElementById('detail-thumbnails-row');
    thumbsRow.innerHTML = '';
    const imagesList = p.gallery || [p.image];
    imagesList.forEach((imgUrl, idx) => {
        const box = document.createElement('div');
        box.className = `thumb-box ${idx === 0 ? 'active' : ''}`;
        box.innerHTML = `<img src="${imgUrl}" alt="Thumb ${idx+1}">`;
        box.addEventListener('click', () => {
            document.querySelectorAll('.thumb-box').forEach(t => t.classList.remove('active'));
            box.classList.add('active');
            mainImg.src = imgUrl;
        });
        thumbsRow.appendChild(box);
    });
    
    // Enable Image Zoom interaction (Micro-interaction)
    const zoomArea = document.getElementById('detail-image-zoom-area');
    zoomArea.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomArea.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = "scale(1.8)";
    });
    zoomArea.addEventListener('mouseleave', () => {
        mainImg.style.transform = "scale(1)";
    });
    
    // Render size attributes
    const sizeRow = document.getElementById('detail-sizes-row');
    sizeRow.innerHTML = '';
    if (p.sizes && p.sizes.length > 0) {
        document.getElementById('detail-size-section').style.display = 'block';
        activeDetailSize = p.sizes[0];
        p.sizes.forEach(sz => {
            const btn = document.createElement('button');
            btn.className = `size-btn ${sz === activeDetailSize ? 'active' : ''}`;
            btn.textContent = sz;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDetailSize = sz;
            });
            sizeRow.appendChild(btn);
        });
    } else {
        document.getElementById('detail-size-section').style.display = 'none';
        activeDetailSize = "Free Size";
    }

    // Render colors
    const colorsRow = document.getElementById('detail-colors-row');
    colorsRow.innerHTML = '';
    const colorHexes = {
        "Crimson Red / Metallic Gold": "#8b0000",
        "Royal Blue": "#0000ff",
        "Emerald Green": "#50c878",
        "Pastel Pink": "#ffc0cb",
        "Maroon & Golden Yellow": "#800000",
        "Ruby Red": "#e0115f",
        "Mustard Gold": "#e1ad01",
        "Peach Pink": "#ffcba4",
        "Blue & Maroon Floral": "#4682b4"
    };
    
    if (p.color) {
        document.getElementById('detail-color-section').style.display = 'block';
        activeDetailColor = p.color;
        const dot = document.createElement('button');
        dot.className = "color-dot active";
        dot.style.backgroundColor = colorHexes[p.color] || '#111';
        dot.title = p.color;
        colorsRow.appendChild(dot);
    } else {
        document.getElementById('detail-color-section').style.display = 'none';
        activeDetailColor = "Standard";
    }
    
    // Reset quantity
    document.getElementById('detail-qty-val').value = 1;
    
    // Set specifications
    document.getElementById('spec-fabric').textContent = p.fabric || 'Premium Blended Fabric';
    document.getElementById('spec-work').textContent = p.work || 'Designer Embroidered';
    document.getElementById('spec-color').textContent = p.color || 'Multicolor';
    document.getElementById('spec-occasion').textContent = p.category === 'sarees' || p.category === 'lehenga-blouse' ? 'Bridal / Wedding Guest' : 'Casual / Retail';
    document.getElementById('spec-weight').textContent = p.category === 'sarees' ? '750 - 900 grams' : '300 - 450 grams';
    
    // Seed and render reviews list
    renderReviewsListTab();
    renderQAListTab();
    
    // Setup Action Buttons
    const cartBtn = document.getElementById('btn-detail-add-to-cart');
    cartBtn.onclick = () => {
        const qty = parseInt(document.getElementById('detail-qty-val').value) || 1;
        addToCart(p.id, qty, activeDetailSize, activeDetailColor);
    };
    
    const buyBtn = document.getElementById('btn-detail-buy-now');
    buyBtn.onclick = () => {
        const qty = parseInt(document.getElementById('detail-qty-val').value) || 1;
        addToCart(p.id, qty, activeDetailSize, activeDetailColor, false); // add silently
        window.location.hash = '#/checkout';
    };

    const wishBtn = document.getElementById('btn-detail-wishlist');
    wishBtn.onclick = () => toggleWishlist(p.id, wishBtn);
    if (wishlist.includes(p.id)) {
        wishBtn.classList.add('active');
    } else {
        wishBtn.classList.remove('active');
    }
    
    // Cross sells
    const relatedGrid = document.getElementById('detail-related-products');
    relatedGrid.innerHTML = '';
    products.filter(item => item.id !== p.id).slice(0, 3).forEach(item => {
        relatedGrid.appendChild(createProductCardElement(item));
    });
    
    // Tab toggling logic
    document.querySelectorAll('.tab-nav-item').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.tab-nav-item').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        };
    });

    // Share action
    document.getElementById('btn-share-product').onclick = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast("Product link copied to clipboard!", "success");
    };

    lucide.createIcons();
}

// Helpers for detail tabs
function renderReviewsListTab() {
    const list = document.getElementById('detail-reviews-list-container');
    list.innerHTML = '';
    SEED_REVIEWS.forEach(rev => {
        const box = document.createElement('div');
        box.style.borderBottom = "1px solid var(--color-border)";
        box.style.paddingBottom = "15px";
        box.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <strong style="font-size:0.9rem;">${rev.name}</strong>
                <span style="font-size:0.75rem; color:var(--color-text-muted);">${rev.date}</span>
            </div>
            <div style="color:var(--color-warning); font-size:0.75rem; margin-bottom:8px;">${'★'.repeat(rev.rating)}${'☆'.repeat(5-rev.rating)}</div>
            <p style="font-size:0.85rem; color:var(--color-text-muted);">${rev.comment}</p>
        `;
        list.appendChild(box);
    });
}

function renderQAListTab() {
    const list = document.getElementById('detail-qa-list');
    list.innerHTML = '';
    SEED_QA.forEach(item => {
        const div = document.createElement('div');
        div.className = "qa-item";
        div.innerHTML = `
            <div class="qa-question"><i data-lucide="help-circle" style="width:16px;color:var(--color-secondary-dark);"></i> <span>Q: ${item.question}</span></div>
            <div class="qa-answer"><i data-lucide="message-square" style="width:14px;color:var(--color-text-muted);"></i> <span>A: ${item.answer}</span></div>
        `;
        list.appendChild(div);
    });
    lucide.createIcons();
}

// Q&A review submit listeners
document.getElementById('product-review-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('review-author-name').value;
    const text = document.getElementById('review-text-content').value;
    
    SEED_REVIEWS.unshift({ name, rating: 5, date: "Today", comment: text });
    showToast("Review submitted successfully! Pending approval.", "success");
    renderReviewsListTab();
    
    document.getElementById('review-author-name').value = '';
    document.getElementById('review-text-content').value = '';
};

document.getElementById('product-qa-form').onsubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById('qa-input-text').value;
    SEED_QA.unshift({ question: text, answer: "Sowbhagya will answer this shortly." });
    showToast("Question posted. You will receive email response.", "success");
    renderQAListTab();
    document.getElementById('qa-input-text').value = '';
};


// Detail Quantity button events
document.getElementById('btn-qty-minus').onclick = () => {
    const input = document.getElementById('detail-qty-val');
    let val = parseInt(input.value) || 1;
    if (val > 1) input.value = val - 1;
};
document.getElementById('btn-qty-plus').onclick = () => {
    const input = document.getElementById('detail-qty-val');
    let val = parseInt(input.value) || 1;
    if (val < 10) input.value = val + 1;
};


// --- 8. CART VIEW CONTROLLER ---
function addToCart(productId, qty, size, color, redirect = true) {
    const p = products.find(item => item.id === productId);
    if (!p) return;
    
    const existing = cart.find(item => item.id === productId && item.size === size && item.color === color);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            sku: p.sku,
            price: p.price,
            priceOld: p.priceOld,
            image: p.image,
            qty: qty,
            size: size,
            color: color
        });
    }
    
    syncState();
    showToast(`Added ${qty} x ${p.name} to Shopping Bag!`, "success");
    
    if (redirect) {
        // Redirect directly to cart
        window.location.hash = '#/cart';
    }
}

function updateCartQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
    }
    syncState();
    renderCartPage();
}

function removeCartItem(idx) {
    cart.splice(idx, 1);
    syncState();
    renderCartPage();
    showToast("Item removed from Shopping Bag.", "info");
}

let activeCouponMultiplier = 1.0;
let activeCouponCode = "";

function renderCartPage() {
    const list = document.getElementById('cart-items-list-container');
    const layout = document.getElementById('cart-items-layout');
    const empty = document.getElementById('cart-empty-state');
    
    if (cart.length === 0) {
        layout.classList.add('hidden');
        empty.classList.remove('hidden');
        return;
    }
    
    layout.classList.remove('hidden');
    empty.classList.add('hidden');
    
    list.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, idx) => {
        const totalItemPrice = item.price * item.qty;
        subtotal += totalItemPrice;
        
        const row = document.createElement('div');
        row.className = "cart-item";
        row.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size} | Color: ${item.color} | SKU: ${item.sku}</p>
            </div>
            <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
            <div class="quantity-selector" style="height:35px;">
                <button class="qty-btn" onclick="updateCartQty(${idx}, -1)"><i data-lucide="minus" style="width:12px;"></i></button>
                <span class="qty-input" style="width:25px;font-size:0.85rem;">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${idx}, 1)"><i data-lucide="plus" style="width:12px;"></i></button>
            </div>
            <div class="cart-item-remove" onclick="removeCartItem(${idx})">
                <i data-lucide="trash-2" style="width:18px;"></i>
            </div>
        `;
        list.appendChild(row);
    });
    
    // Calculations
    const discount = activeCouponCode !== "" ? Math.round(subtotal * (1 - activeCouponMultiplier)) : 0;
    const shipping = subtotal > 1999 ? 0 : 150;
    const total = subtotal - discount + shipping;
    
    document.getElementById('cart-summary-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cart-summary-coupon').textContent = `-₹${discount.toLocaleString()}`;
    document.getElementById('cart-summary-shipping').textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
    document.getElementById('cart-summary-total').textContent = `₹${total.toLocaleString()}`;
    
    // Cross sells in cart
    const crossGrid = document.getElementById('cart-cross-sells');
    crossGrid.innerHTML = '';
    products.slice(2, 5).forEach(p => {
        crossGrid.appendChild(createProductCardElement(p));
    });
    
    lucide.createIcons();
}

// Coupon apply logic
document.getElementById('btn-apply-coupon').onclick = () => {
    const code = document.getElementById('cart-coupon-input-val').value.trim().toUpperCase();
    const msgPane = document.getElementById('coupon-message-pane');
    
    if (code === "SBFEST20") {
        activeCouponMultiplier = 0.8;
        activeCouponCode = "SBFEST20";
        msgPane.textContent = "SBFEST20 applied successfully! 20% discount added.";
        msgPane.style.color = "var(--color-success)";
        renderCartPage();
    } else {
        activeCouponMultiplier = 1.0;
        activeCouponCode = "";
        msgPane.textContent = "Invalid Coupon Code.";
        msgPane.style.color = "var(--color-danger)";
        renderCartPage();
    }
};


// --- 9. CHECKOUT & ORDER PLACEMENT ---
function renderCheckoutPage() {
    const list = document.getElementById('checkout-summary-items-list');
    list.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        const box = document.createElement('div');
        box.style.display = 'flex';
        box.style.justifyContent = 'space-between';
        box.style.fontSize = '0.85rem';
        box.innerHTML = `
            <span>${item.name} (x${item.qty})</span>
            <strong>₹${(item.price * item.qty).toLocaleString()}</strong>
        `;
        list.appendChild(box);
    });
    
    const discount = activeCouponCode !== "" ? Math.round(subtotal * (1 - activeCouponMultiplier)) : 0;
    const shipping = subtotal > 1999 ? 0 : 150;
    const total = subtotal - discount + shipping;
    
    document.getElementById('checkout-sum-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('checkout-sum-discount').textContent = `-₹${discount.toLocaleString()}`;
    document.getElementById('checkout-sum-shipping').textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
    document.getElementById('checkout-sum-total').textContent = `₹${total.toLocaleString()}`;
}

// Submit checkout form
document.getElementById('checkout-main-form').onsubmit = (e) => {
    e.preventDefault();
    
    const orderId = `SBF-${Math.floor(10000 + Math.random() * 90000)}`;
    const fname = document.getElementById('check-firstname').value;
    const lname = document.getElementById('check-lastname').value;
    const phone = document.getElementById('check-phone').value;
    const street = document.getElementById('check-street').value;
    const city = document.getElementById('check-city').value;
    const pincode = document.getElementById('check-pincode').value;
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        // Deduct inventory stock
        const p = products.find(prod => prod.id === item.id);
        if (p) p.stock = Math.max(0, p.stock - item.qty);
    });
    
    const discount = activeCouponCode !== "" ? Math.round(subtotal * (1 - activeCouponMultiplier)) : 0;
    const shipping = subtotal > 1999 ? 0 : 150;
    const grandTotal = subtotal - discount + shipping;
    
    const newOrder = {
        orderId: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName: `${fname} ${lname}`,
        phone: phone,
        address: `${street}, ${city} - ${pincode}`,
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: grandTotal,
        status: "Pending",
        trackingId: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        deliveryUrl: "https://www.delhivery.com"
    };
    
    orders.unshift(newOrder);
    
    // Reset state
    cart = [];
    activeCouponCode = "";
    activeCouponMultiplier = 1.0;
    document.getElementById('checkout-main-form').reset();
    
    syncState();
    
    showToast("Order placed successfully!", "success");
    window.location.hash = `#/success?id=${orderId}`;
};


// --- 10. ORDER LOGISTICS TRACKING ---
function renderTrackingPage(orderIdParam) {
    const searchInput = document.getElementById('tracking-search-id-val');
    const detailsPane = document.getElementById('tracking-details-pane');
    const emptyPane = document.getElementById('tracking-empty-state');
    
    if (orderIdParam) {
        searchInput.value = orderIdParam;
    }
    
    const idToSearch = searchInput.value.trim();
    if (!idToSearch) {
        detailsPane.classList.add('hidden');
        emptyPane.classList.remove('hidden');
        return;
    }
    
    const ord = orders.find(o => o.orderId.toLowerCase() === idToSearch.toLowerCase());
    if (!ord) {
        showToast("Invalid Order Reference ID. Try again.", "error");
        detailsPane.classList.add('hidden');
        emptyPane.classList.remove('hidden');
        return;
    }
    
    // Found order
    detailsPane.classList.remove('hidden');
    emptyPane.classList.add('hidden');
    
    document.getElementById('track-order-id-label').textContent = ord.orderId;
    document.getElementById('track-shipping-address').textContent = ord.address;
    document.getElementById('track-logistic-url').href = ord.deliveryUrl;
    
    // Status visual timelines
    const steps = ['Pending', 'Packed', 'Shipped', 'Out for Delivery', 'Completed'];
    const currentIdx = steps.indexOf(ord.status);
    
    // Update progress bar
    const progressWidth = currentIdx >= 0 ? (currentIdx / 4) * 100 : 0;
    document.getElementById('track-timeline-progress-bar').style.width = `${progressWidth}%`;
    
    // Toggle active timeline classes
    steps.forEach((step, idx) => {
        const stepElId = `step-${step.toLowerCase().replace(/ /g, '-')}`;
        const el = document.getElementById(stepElId);
        if (el) {
            el.className = "timeline-step";
            if (idx < currentIdx) {
                el.classList.add('completed');
            } else if (idx === currentIdx) {
                el.classList.add('active');
            }
        }
    });
    
    lucide.createIcons();
}

document.getElementById('btn-search-tracking').onclick = () => {
    renderTrackingPage();
};


// --- 11. CUSTOMER DASHBOARD CONTROLLER ---
function renderCustomerDashboard(subTab) {
    const tabs = document.querySelectorAll('.dash-tab-content');
    const links = document.querySelectorAll('.dashboard-menu-link');
    
    const activeTabId = subTab ? `dash-tab-${subTab}` : 'dash-tab-profile';
    
    // Show active tab
    tabs.forEach(t => t.classList.add('hidden'));
    const activeTab = document.getElementById(activeTabId);
    if (activeTab) activeTab.classList.remove('hidden');
    
    // Sidebar highlight
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('data-tab') === activeTabId) l.classList.add('active');
    });
    
    // If order history tab
    if (activeTabId === 'dash-tab-orders') {
        const tbody = document.getElementById('customer-orders-list-rows');
        tbody.innerHTML = '';
        
        if (orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No orders placed yet.</td></tr>`;
            return;
        }
        
        orders.forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${o.orderId}</strong></td>
                <td>${o.date}</td>
                <td>₹${o.total.toLocaleString()}</td>
                <td><span class="stock-status-badge in-stock">${o.status}</span></td>
                <td>
                    <a href="#/tracking/${o.orderId}" class="btn btn-primary" style="padding:6px 12px; font-size:0.7rem; letter-spacing:0.5px;">Track Order</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Wishlist tab
    if (activeTabId === 'dash-tab-wishlist') {
        const wishGrid = document.getElementById('customer-wishlist-grid');
        wishGrid.innerHTML = '';
        
        const favs = products.filter(p => wishlist.includes(p.id));
        if (favs.length === 0) {
            document.getElementById('wishlist-empty-pane').classList.remove('hidden');
        } else {
            document.getElementById('wishlist-empty-pane').classList.add('hidden');
            favs.forEach(p => {
                wishGrid.appendChild(createProductCardElement(p));
            });
        }
    }
}

// Wishlist interaction handler
function toggleWishlist(productId, btnEl) {
    const idx = wishlist.indexOf(productId);
    if (idx >= 0) {
        wishlist.splice(idx, 1);
        if (btnEl) btnEl.classList.remove('active');
        showToast("Removed from wishlist.", "info");
    } else {
        wishlist.push(productId);
        if (btnEl) btnEl.classList.add('active');
        showToast("Added to wishlist!", "success");
    }
    syncState();
}

// Bind actions on document levels for wishlist buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn-card');
    if (btn) {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'));
        toggleWishlist(id, btn);
    }
    
    // Add to cart buttons
    const directAdd = e.target.closest('.add-to-cart-direct');
    if (directAdd) {
        e.preventDefault();
        const id = parseInt(directAdd.getAttribute('data-id'));
        addToCart(id, 1, "Free Size", "Standard");
    }
});


// --- 12. ADMIN CONTROL PANEL CONTROLLER ---
function renderAdminPanel(subSection) {
    const sections = document.querySelectorAll('.admin-panel-sub-section');
    const links = document.querySelectorAll('.admin-sidebar .admin-menu-link');
    
    const activeSecId = subSection ? `admin-${subSection}-panel` : 'admin-dash-panel';
    
    sections.forEach(s => s.classList.add('hidden'));
    const activeSec = document.getElementById(activeSecId);
    if (activeSec) activeSec.classList.remove('hidden');
    
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('data-section') === activeSecId) l.classList.add('active');
    });
    
    // Math Analytics Dashboard
    let totalRevenue = 0;
    orders.forEach(o => {
        totalRevenue += o.total;
    });
    
    document.getElementById('admin-revenue-label').textContent = `₹${totalRevenue.toLocaleString()}`;
    document.getElementById('admin-orders-label').textContent = orders.length;
    document.getElementById('admin-products-label').textContent = products.length;
    
    // Load orders lists in admin recent panel
    if (activeSecId === 'admin-dash-panel') {
        const tbody = document.getElementById('admin-recent-orders-list');
        tbody.innerHTML = '';
        orders.slice(0, 5).forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${o.orderId}</strong></td>
                <td>${o.customerName}</td>
                <td>₹${o.total.toLocaleString()}</td>
                <td><span class="stock-status-badge in-stock">${o.status}</span></td>
                <td><a href="#/admin/orders" style="color:var(--color-secondary);text-decoration:underline;">Manage</a></td>
            `;
            tbody.appendChild(tr);
        });
        
        // Render dynamic bar chart
        setTimeout(() => renderAdminBarChart(), 50);
    }

    // CRUD catalog products list
    if (activeSecId === 'admin-products-panel') {
        const tbody = document.getElementById('admin-catalog-products-list');
        tbody.innerHTML = '';
        products.forEach((p, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code>${p.sku}</code></td>
                <td><strong>${p.name}</strong></td>
                <td>${p.category.toUpperCase()}</td>
                <td>₹${p.price.toLocaleString()}</td>
                <td>${p.stock > 0 ? `<span style="color:green;">In Stock (${p.stock})</span>` : '<span style="color:red;">Out of Stock</span>'}</td>
                <td>
                    <button class="btn btn-primary" onclick="editProductAdmin(${idx})" style="padding:4px 10px;font-size:0.7rem;background:#444;border-color:#555;">Edit</button>
                    <button class="btn btn-primary" onclick="deleteProductAdmin(${idx})" style="padding:4px 10px;font-size:0.7rem;background:var(--color-danger);border-color:var(--color-danger);">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Orders logistics status editor list
    if (activeSecId === 'admin-orders-panel') {
        const tbody = document.getElementById('admin-orders-management-list');
        tbody.innerHTML = '';
        orders.forEach((o, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${o.orderId}</strong></td>
                <td>${o.customerName}</td>
                <td>${o.phone}</td>
                <td>₹${o.total.toLocaleString()}</td>
                <td>
                    <select onchange="updateAdminOrderStatus(${idx}, this.value)" style="background:#222;color:#fff;border:1px solid #444;padding:4px;">
                        <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Packed" ${o.status === 'Packed' ? 'selected' : ''}>Packed</option>
                        <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                        <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
                <td>
                    <input type="text" value="${o.trackingId}" onchange="updateAdminOrderTracking(${idx}, this.value)" style="background:#222;color:#fff;border:1px solid #444;padding:4px;width:110px;">
                </td>
                <td>
                    <button onclick="updateAdminOrderUrl(${idx})" style="color:var(--color-secondary);text-decoration:underline;">Url Settings</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Admin Catalog helper operations
function editProductAdmin(idx) {
    const p = products[idx];
    document.getElementById('admin-modal-title').textContent = "Edit Product Details";
    document.getElementById('admin-field-index').value = idx;
    document.getElementById('admin-field-sku').value = p.sku;
    document.getElementById('admin-field-title').value = p.name;
    document.getElementById('admin-field-category').value = p.category;
    document.getElementById('admin-field-price-old').value = p.priceOld || p.price;
    document.getElementById('admin-field-price-new').value = p.price;
    document.getElementById('admin-field-stock').value = p.stock;
    document.getElementById('admin-field-image').value = p.image;
    document.getElementById('admin-field-desc').value = p.description;
    
    document.getElementById('admin-product-modal-overlay').classList.add('active');
}

function deleteProductAdmin(idx) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(idx, 1);
        syncState();
        renderAdminPanel('products');
        showToast("Product deleted from database.", "info");
    }
}

function updateAdminOrderStatus(idx, val) {
    orders[idx].status = val;
    syncState();
    showToast(`Order status set to ${val}`, "success");
}

function updateAdminOrderTracking(idx, val) {
    orders[idx].trackingId = val;
    syncState();
    showToast("Tracking ID updated successfully.", "success");
}

function updateAdminOrderUrl(idx) {
    const currentUrl = orders[idx].deliveryUrl;
    const newUrl = prompt("Enter Logistics Delivery Tracking URL Partner:", currentUrl);
    if (newUrl !== null) {
        orders[idx].deliveryUrl = newUrl;
        syncState();
        showToast("Logistics tracking partner URL updated.", "success");
    }
}

// Catalog Add Modal bindings
document.getElementById('btn-admin-add-product').onclick = () => {
    document.getElementById('admin-product-crud-form').reset();
    document.getElementById('admin-modal-title').textContent = "Add New Product";
    document.getElementById('admin-field-index').value = "";
    document.getElementById('admin-product-modal-overlay').classList.add('active');
};

document.getElementById('btn-close-product-modal').onclick = () => {
    document.getElementById('admin-product-modal-overlay').classList.remove('active');
};
document.getElementById('btn-cancel-product-modal').onclick = () => {
    document.getElementById('admin-product-modal-overlay').classList.remove('active');
};

// Form Product Submit
document.getElementById('admin-product-crud-form').onsubmit = (e) => {
    e.preventDefault();
    
    const idxVal = document.getElementById('admin-field-index').value;
    const sku = document.getElementById('admin-field-sku').value;
    const title = document.getElementById('admin-field-title').value;
    const category = document.getElementById('admin-field-category').value;
    const oldPrice = parseInt(document.getElementById('admin-field-price-old').value) || 0;
    const newPrice = parseInt(document.getElementById('admin-field-price-new').value) || 0;
    const stock = parseInt(document.getElementById('admin-field-stock').value) || 0;
    const img = document.getElementById('admin-field-image').value;
    const desc = document.getElementById('admin-field-desc').value;
    
    const productData = {
        sku,
        name: title,
        category,
        price: newPrice,
        priceOld: oldPrice,
        rating: 4.8,
        reviewsCount: 1,
        description: desc,
        fabric: "Premium Fashion Weaves",
        work: "Artisan Pattern Detailing",
        color: "Standard Shade",
        sizes: ["Free Size"],
        image: img,
        gallery: [img],
        stock
    };
    
    if (idxVal !== "") {
        // Edit existing
        const idx = parseInt(idxVal);
        products[idx] = { ...products[idx], ...productData };
        showToast("Product updated successfully!", "success");
    } else {
        // Add new
        productData.id = products.length + 1;
        products.unshift(productData);
        showToast("New Product uploaded to catalog!", "success");
    }
    
    syncState();
    document.getElementById('admin-product-modal-overlay').classList.remove('active');
    renderAdminPanel('products');
};

// Banners controller save alert banner
document.getElementById('btn-save-announcement').onclick = () => {
    const text = document.getElementById('admin-banner-announcement-val').value;
    announcement = text;
    syncState();
    document.querySelector('.top-bar-slider').textContent = announcement + " • OWNER: SOWBHAGYA • TEL: 7989646049";
    showToast("Headline Alert Announcement updated!", "success");
};

// Bulk mock seed uploader
document.getElementById('btn-admin-bulk-upload').onclick = () => {
    const bulkItems = [
        {
            id: products.length + 1,
            sku: `SBF-SAR-BU-${Math.floor(100 + Math.random()*900)}`,
            name: "Bulk Uploaded Handloom Saree",
            category: "sarees",
            price: 4999,
            priceOld: 7999,
            rating: 4.9,
            reviewsCount: 3,
            description: "High quality custom bulk uploaded design handloom item.",
            fabric: "Pure Handloom Silk",
            work: "Embroidery Stitching",
            color: "Gold / Blue Accent",
            sizes: ["Free Size"],
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
            gallery: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"],
            stock: 25
        },
        {
            id: products.length + 2,
            sku: `SBF-SAR-BU-${Math.floor(100 + Math.random()*900)}`,
            name: "Boutique Design Frock",
            category: "frocks",
            price: 1899,
            priceOld: 2999,
            rating: 4.8,
            reviewsCount: 1,
            description: "Heavy sequence kids frocks with borders.",
            fabric: "Soft Netting",
            work: "Sequence Borders",
            color: "Lavender",
            sizes: ["S", "M", "L"],
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
            gallery: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"],
            stock: 10
        }
    ];
    
    products.push(...bulkItems);
    syncState();
    renderAdminPanel('products');
    showToast("Bulk Mock Seed Completed! Added 2 products.", "success");
};


// --- 13. AUTH SIGN IN / SIGN UP CONTROLLER ---
function renderAuthPage(action) {
    const titleLabel = document.getElementById('auth-title-label');
    const toggleLink = document.getElementById('auth-toggle-link');
    
    if (action === 'register') {
        titleLabel.textContent = "Sign Up / Register";
        toggleLink.textContent = "Already have an account? Sign In";
        toggleLink.href = "#/auth/login";
    } else {
        titleLabel.textContent = "Sign In";
        toggleLink.textContent = "Don't have an account? Sign Up";
        toggleLink.href = "#/auth/register";
    }
}

document.getElementById('auth-main-form').onsubmit = (e) => {
    e.preventDefault();
    
    const email = document.getElementById('auth-email-input').value;
    const titleLabel = document.getElementById('auth-title-label').textContent;
    
    if (titleLabel.includes("Sign In")) {
        // Login
        activeSession = {
            email: email,
            name: email.split('@')[0].toUpperCase(),
            phone: "7989646049",
            address: "Mahaboob Nagar, Pan Chaurasta"
        };
        showToast(`Welcome back, ${activeSession.name}!`, "success");
    } else {
        // Register
        activeSession = {
            email: email,
            name: email.split('@')[0].toUpperCase(),
            phone: "7989646049",
            address: "Mahaboob Nagar, Pan Chaurasta"
        };
        showToast(`Registration Successful! Welcome ${activeSession.name}!`, "success");
    }
    
    syncState();
    updateAuthButtonsUI();
    window.location.hash = '#/dashboard/profile';
};

function updateAuthButtonsUI() {
    const btn = document.getElementById('profile-login-logout-btn');
    if (activeSession) {
        btn.innerHTML = `<i data-lucide="log-out" style="display:inline-block;width:14px;margin-right:8px;vertical-align:-2px;"></i>Sign Out`;
        btn.onclick = (e) => {
            e.preventDefault();
            activeSession = null;
            syncState();
            updateAuthButtonsUI();
            showToast("Signed out successfully.", "info");
            window.location.hash = '#/home';
        };
    } else {
        btn.innerHTML = `<i data-lucide="log-in" style="display:inline-block;width:14px;margin-right:8px;vertical-align:-2px;"></i>Sign In`;
        btn.onclick = null;
    }
    lucide.createIcons();
}

document.getElementById('btn-customer-logout').onclick = () => {
    activeSession = null;
    syncState();
    showToast("Logged out successfully.", "info");
    window.location.hash = '#/home';
};

document.getElementById('btn-admin-logout').onclick = () => {
    showToast("Exited admin dashboard environment.", "info");
    window.location.hash = '#/home';
};


// --- 14. PROFILE & ACCORDION HELPERS ---
function renderFAQPage() {
    const list = document.getElementById('faq-accordions-pane');
    list.innerHTML = '';
    
    const faqs = [
        { q: "What is your specialty work?", a: "SB Fashions specialises in custom bridal Maggam hand work blouses, computer-worked blouses, and Banarasi heavy border silk sarees. All designs are personally approved and curated by Sowbhagya." },
        { q: "Where is the physical boutique located?", a: "Our boutique is located in the premium shopping hub at Pan Chaurasta, Mahaboob Nagar, Telangana." },
        { q: "How do I communicate size customizations?", a: "After placing an order, tap the floating WhatsApp button to chat directly with our design master and send custom measurements." },
        { q: "What are the shipping charges?", a: "Shipping is absolutely free for all order values above ₹1999. For smaller orders, a standard fee of ₹150 is added." }
    ];
    
    faqs.forEach(f => {
        const div = document.createElement('div');
        div.style.border = "1px solid var(--color-border)";
        div.style.borderRadius = "var(--radius-md)";
        div.style.overflow = "hidden";
        div.style.backgroundColor = "var(--color-bg-surface)";
        
        div.innerHTML = `
            <div style="padding:15px 20px; font-weight:700; cursor:pointer; background-color:var(--color-bg-alt); display:flex; justify-content:space-between; align-items:center;" class="faq-q-btn">
                <span>${f.q}</span>
                <i data-lucide="chevron-down" style="width:16px;"></i>
            </div>
            <div style="padding:0 20px; height:0; overflow:hidden; transition:height var(--transition-fast); font-size:0.9rem; color:var(--color-text-muted);" class="faq-ans-body">
                <div style="padding:15px 0;">${f.a}</div>
            </div>
        `;
        
        const btn = div.querySelector('.faq-q-btn');
        const body = div.querySelector('.faq-ans-body');
        const icon = div.querySelector('i');
        
        btn.onclick = () => {
            const isClosed = body.style.height === "" || body.style.height === "0px";
            // close other answers first
            document.querySelectorAll('.faq-ans-body').forEach(b => b.style.height = "0px");
            document.querySelectorAll('.faq-q-btn i').forEach(i => i.style.transform = "rotate(0deg)");
            
            if (isClosed) {
                body.style.height = `${body.scrollHeight}px`;
                icon.style.transform = "rotate(180deg)";
            } else {
                body.style.height = "0px";
                icon.style.transform = "rotate(0deg)";
            }
        };
        
        list.appendChild(div);
    });
    lucide.createIcons();
}


// --- 15. MICRO INTERACTIONS: COUNT UP, COUNTDOWN, BACK TO TOP ---

// Stats Count Up Animation
function triggerStatisticsCountUp() {
    const animatedStats = new Set();

    function animateStat(stat) {
        if (animatedStats.has(stat)) return;
        animatedStats.add(stat);
        const targetVal = parseFloat(stat.getAttribute('data-val'));
        const decimals = parseInt(stat.getAttribute('data-decimals')) || 0;
        let current = 0;
        const duration = 2200;
        const stepTime = 28;
        const increment = targetVal / (duration / stepTime);
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
                current = targetVal;
                clearInterval(timer);
            }
            stat.textContent = current.toFixed(decimals) + (decimals === 0 ? '+' : '');
        }, stepTime);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateStat(entry.target);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.count-up-stat').forEach(stat => statObserver.observe(stat));
}

// Word Reveal Animation for section headings (triggered on scroll)
function initWordRevealAnimations() {
    document.querySelectorAll('.section-title:not(.wr-done), .section-pretitle:not(.wr-done)').forEach(el => {
        el.classList.add('wr-done', 'word-reveal');
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map((word, i) =>
            `<span class="wr-word" style="animation-delay:${(i * 0.1 + 0.05).toFixed(2)}s">${word}</span>`
        ).join(' ');
    });

    const wrObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                wrObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.word-reveal').forEach(el => wrObserver.observe(el));
}

// Countdown timer
function updateCountdown() {
    // End date is set to +3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59);
    
    setInterval(() => {
        const diff = targetDate.getTime() - new Date().getTime();
        if (diff <= 0) return;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('timer-days');
        const hoursEl = document.getElementById('timer-hours');
        const minsEl = document.getElementById('timer-mins');
        const secsEl = document.getElementById('timer-secs');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }, 1000);
}
updateCountdown();

// Back To Top button visibility & scroll
const topBtn = document.getElementById('btn-back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        topBtn.classList.add('active');
        document.getElementById('main-header').classList.add('scrolled');
    } else {
        topBtn.classList.remove('active');
        document.getElementById('main-header').classList.remove('scrolled');
    }
});
topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


// --- 16. MOBILE DRAWER SYSTEM ---
const drawer = document.getElementById('mobile-nav-drawer');
const overlay = document.getElementById('mobile-drawer-overlay');

document.getElementById('mobile-drawer-toggle').onclick = () => {
    drawer.style.left = '0';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
};

function closeMobileDrawer() {
    drawer.style.left = '-300px';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
}

document.getElementById('mobile-drawer-close').onclick = closeMobileDrawer;
overlay.onclick = closeMobileDrawer;


// --- 17. HEADER SEARCH TOGGLE (Micro-Interaction) ---
const searchToggle = document.getElementById('header-search-toggle');
const searchWrapper = document.getElementById('header-search-wrapper');
const searchInput = document.getElementById('header-search-input');

searchToggle.onclick = () => {
    const isAct = searchWrapper.classList.toggle('active');
    if (isAct) {
        searchInput.focus();
    } else {
        // Trigger search query
        const val = searchInput.value.trim();
        if (val) {
            triggerSearch(val);
        }
    }
};

searchInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        const val = searchInput.value.trim();
        if (val) triggerSearch(val);
    }
};

function triggerSearch(query) {
    // SECRET: typing #admin in search bar opens admin panel
    if (query.toLowerCase() === '#admin') {
        searchInput.value = '';
        searchWrapper.classList.remove('active');
        hideLiveDropdown();
        window.location.hash = '#/admin';
        return;
    }

    // Perform filtering matching products
    const match = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    
    // Switch to search category results mock
    switchView('category');
    
    document.getElementById('category-page-title').textContent = "Search Results";
    document.getElementById('category-page-subtitle').textContent = `Matching results for "${query}"`;
    document.getElementById('category-page-banner').style.backgroundImage = `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200')`;
    
    const grid = document.getElementById('category-product-grid');
    grid.innerHTML = '';
    document.getElementById('category-listing-count').textContent = match.length;
    
    if (match.length === 0) {
        document.getElementById('category-empty-state').classList.remove('hidden');
    } else {
        document.getElementById('category-empty-state').classList.add('hidden');
        match.forEach(p => {
            grid.appendChild(createProductCardElement(p));
        });
    }
    searchInput.value = '';
    searchWrapper.classList.remove('active');
    hideLiveDropdown();
    lucide.createIcons();
}

// --- LIVE SEARCH DROPDOWN ---
const liveDropdown = document.getElementById('search-live-dropdown');

function showLiveDropdown(query) {
    if (!query || query.length < 2) { hideLiveDropdown(); return; }
    
    const matches = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    liveDropdown.innerHTML = '';
    
    if (matches.length === 0) {
        liveDropdown.innerHTML = `<div class="search-no-results">No products found for "${query}"</div>`;
    } else {
        matches.forEach(p => {
            const item = document.createElement('a');
            item.className = 'search-result-item';
            item.href = `#/product/${p.id}`;
            item.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div class="search-result-info">
                    <h5>${p.name}</h5>
                    <span>₹${p.price.toLocaleString()}</span>
                </div>
            `;
            item.onclick = () => { hideLiveDropdown(); searchInput.value = ''; searchWrapper.classList.remove('active'); };
            liveDropdown.appendChild(item);
        });
        const seeAll = document.createElement('div');
        seeAll.className = 'search-see-all';
        seeAll.textContent = `See all results for "${query}"`;
        seeAll.onclick = () => triggerSearch(query);
        liveDropdown.appendChild(seeAll);
    }
    
    liveDropdown.classList.add('visible');
}

function hideLiveDropdown() {
    liveDropdown.classList.remove('visible');
    liveDropdown.innerHTML = '';
}

searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    showLiveDropdown(val);
});

document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) hideLiveDropdown();
});

// User Profile small dropdown toggle
const profileToggle = document.getElementById('profile-menu-toggle');
const profileMenu = document.getElementById('profile-dropdown-menu');

profileToggle.onclick = (e) => {
    e.stopPropagation();
    const visible = profileMenu.style.visibility === 'visible';
    if (visible) {
        profileMenu.style.opacity = '0';
        profileMenu.style.visibility = 'hidden';
    } else {
        profileMenu.style.opacity = '1';
        profileMenu.style.visibility = 'visible';
    }
};

document.addEventListener('click', (evPM) => {
    if (!profileToggle.contains(evPM.target)) {
        profileMenu.style.opacity = '0';
        profileMenu.style.visibility = 'hidden';
    }
});


// --- ADMIN PASSWORD GATE ---
const ADMIN_PASSWORD = 'sbfashions2026';
let adminAuthenticated = false;

function showAdminGate(onSuccess) {
    if (adminAuthenticated) { onSuccess(); return; }
    
    const overlay = document.createElement('div');
    overlay.className = 'admin-gate-overlay';
    overlay.id = 'admin-gate-overlay';
    overlay.innerHTML = `
        <div class="admin-gate-card">
            <div class="admin-gate-logo">SB FASHIONS</div>
            <div class="admin-gate-subtitle">Secure Admin Access</div>
            <i data-lucide="shield-check" style="color:var(--color-secondary);width:40px;height:40px;margin-bottom:20px;"></i>
            <form id="admin-gate-form">
                <input type="password" class="input-field" id="admin-gate-pwd" placeholder="••••••••••" autocomplete="current-password">
                <div class="admin-gate-error" id="admin-gate-error">Incorrect password. Please try again.</div>
                <button type="submit" class="btn btn-gold" style="width:100%;height:45px;">Enter Admin Panel</button>
            </form>
            <p style="margin-top:15px;font-size:0.7rem;color:#555;">Authorised personnel only.</p>
        </div>
    `;
    document.body.appendChild(overlay);
    lucide.createIcons();
    
    setTimeout(() => document.getElementById('admin-gate-pwd').focus(), 100);
    
    document.getElementById('admin-gate-form').onsubmit = (e) => {
        e.preventDefault();
        const pwd = document.getElementById('admin-gate-pwd').value;
        if (pwd === ADMIN_PASSWORD) {
            adminAuthenticated = true;
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
            onSuccess();
        } else {
            const errEl = document.getElementById('admin-gate-error');
            errEl.classList.remove('visible');
            void errEl.offsetWidth; // force reflow for re-animation
            errEl.classList.add('visible');
            document.getElementById('admin-gate-pwd').value = '';
            document.getElementById('admin-gate-pwd').focus();
        }
    };
}


// --- MOBILE FILTER SIDEBAR TOGGLE ---
const mobileFilterToggle = document.getElementById('btn-mobile-filter-toggle');
const filterSidebar = document.getElementById('category-filter-sidebar');

// Create overlay element
const filterOverlay = document.createElement('div');
filterOverlay.className = 'filter-sidebar-mobile-overlay';
filterOverlay.id = 'filter-sidebar-overlay';
document.body.appendChild(filterOverlay);

if (mobileFilterToggle) {
    mobileFilterToggle.addEventListener('click', () => {
        filterSidebar.classList.add('mobile-open');
        filterOverlay.classList.add('active');
        const closeBtn = document.getElementById('btn-mobile-filter-close');
        if (closeBtn) closeBtn.style.display = 'inline-flex';
    });
}

filterOverlay.addEventListener('click', closeMobileFilterSidebar);

const mobileFilterCloseBtn = document.getElementById('btn-mobile-filter-close');
if (mobileFilterCloseBtn) {
    mobileFilterCloseBtn.addEventListener('click', closeMobileFilterSidebar);
}

function closeMobileFilterSidebar() {
    filterSidebar.classList.remove('mobile-open');
    filterOverlay.classList.remove('active');
}


// --- NEWSLETTER SUCCESS STATE ---
(function setupNewsletter() {
    const form = document.getElementById('newsletter-subscription-form');
    if (!form) return;
    
    // Insert success state sibling
    const successEl = document.createElement('div');
    successEl.className = 'newsletter-success-state';
    successEl.id = 'newsletter-success-block';
    successEl.innerHTML = `
        <div class="newsletter-success-icon">✓</div>
        <div class="newsletter-success-title">You're on the list!</div>
        <div class="newsletter-success-sub">Thank you for subscribing. You'll be the first to know about our festival sales & new arrivals.</div>
    `;
    form.parentNode.insertBefore(successEl, form.nextSibling);
    
    form.onsubmit = (e) => {
        e.preventDefault();
        form.style.display = 'none';
        document.getElementById('newsletter-success-block').classList.add('visible');
        showToast("Subscribed successfully! Welcome to SB Fashions Club.", "success");
    };
})();


// --- DYNAMIC ADMIN BAR CHART ---
function renderAdminBarChart() {
    const chartBox = document.querySelector('.admin-charts-row .chart-box:first-child');
    if (!chartBox) return;
    
    // Get last 7 days revenue data
    const dayLabels = [];
    const dayRevenue = {};
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString('en-IN', { weekday: 'short' });
        dayLabels.push(label);
        dayRevenue[label] = 0;
    }
    
    orders.forEach(o => {
        const dateKey = new Date(o.date).toLocaleDateString('en-IN', { weekday: 'short' });
        if (dayRevenue.hasOwnProperty(dateKey)) {
            dayRevenue[dateKey] += o.total || 0;
        }
    });
    
    const values = dayLabels.map(l => dayRevenue[l]);
    const maxVal = Math.max(...values, 1);
    
    const svgEl = chartBox.querySelector('svg');
    if (svgEl) svgEl.remove();
    
    chartBox.querySelector('h4').insertAdjacentHTML('afterend', `
        <div class="admin-bar-chart-container" id="admin-sales-bar-chart"></div>
    `);
    
    const container = document.getElementById('admin-sales-bar-chart');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `<div class="admin-chart-empty"><i data-lucide="bar-chart-2" style="width:28px;opacity:0.3;"></i><span>Place orders to see chart data</span></div>`;
        lucide.createIcons();
        return;
    }
    
    dayLabels.forEach((label, i) => {
        const val = values[i];
        const heightPct = (val / maxVal) * 100;
        const item = document.createElement('div');
        item.className = 'admin-bar-item';
        item.innerHTML = `
            <div class="admin-bar-val">${val > 0 ? '₹' + val.toLocaleString() : ''}</div>
            <div class="admin-bar-fill" style="height:${Math.max(4, heightPct)}%" title="${label}: ₹${val.toLocaleString()}"></div>
            <div class="admin-bar-label">${label}</div>
        `;
        container.appendChild(item);
    });
}

// --- VISITOR APPLICATION & ORDER INQUIRY FORM WHATSAPP HANDLER ---
function bindVisitorForm() {
    const visForm = document.getElementById('visitor-application-form');
    if (visForm && !visForm.dataset.bound) {
        visForm.dataset.bound = "true";
        visForm.onsubmit = (e) => {
            e.preventDefault();
            showToast("Inquiry submitted successfully! Thank you for contacting SB Fashions.", "success");
            visForm.reset();
        };
    }
}
window.addEventListener('load', bindVisitorForm);
