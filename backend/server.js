const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./sapphire.db');

// Seed data
const initialProducts = [
    { name: "Woven Textured Kurta", price: 3590, category: "mens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw12d7e60e/images/April26/22ndApril26/MST2P26V5120_2.JPG?sw=1000&sh=1200" },
    { name: "Classic Wash & Wear Suit", price: 5990, category: "mens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw1e658958/images/April26/22ndApril26/MST2P26V5150_2.JPG?sw=1000&sh=1200" },
    { name: "Embroidered Cotton Kurta", price: 4590, category: "mens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw08521d4f/images/April26/24thApril26/MST2P26V5160_1.jpg?sw=1000&sh=1200" },
    { name: "Premium Boski Finish Suit", price: 6990, category: "mens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw0da3f59e/images/April26/22ndApril26/MST2P26V5800_2.JPG?sw=1000&sh=1200" },
    { name: "2 Piece - Printed Lawn Suit", price: 6590, category: "womens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwee52dda3/images/June26/15thJune26/PBS2CAHMV667_999_1.JPG?sw=1000&sh=1200" },
    { name: "2 Piece - Printed Lawn Suit", price: 6990, category: "womens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw625193c6/images/June26/8thJune26/PBS2CAHMV669_999_2.jpg?sw=1000&sh=1200" },
    { name: "2 Piece - Printed Lawn Suit", price: 7590, category: "womens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwb682f15d/images/June26/15thJune26/PBS2CAHMV670_999_1.JPG?sw=1000&sh=1200" },
    { name: "2 Piece - Printed Lawn Suit", price: 5590, category: "womens", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwbb9c200b/images/June26/8thJune26/PBS2CAHMV672_999_2.jpg?sw=1000&sh=1200" },
    { name: "Riptide", price: 7490, category: "fragrances", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw52731aad/images/April26/22ndApril26/000000FRM031_1.jpg?sw=1000&sh=1200" },
    { name: "Fall For Him", price: 9999, category: "fragrances", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw7057b515/images/April26/14thApril26/000000FRM046_1.jpg?sw=1000&sh=1200" },
    { name: "Driftwood", price: 9999, category: "fragrances", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwceeba636/images/April26/14thApril26/000000FRM030_1.jpg?sw=1000&sh=1200" },
    { name: "Rebel", price: 9999, category: "fragrances", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwc62c0cb5/images/April26/14thApril26/000000FRM003_1.jpg?sw=1000&sh=1200" }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        category TEXT,
        image TEXT
    )`);

    // Check if table is empty before seeding
    db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)");
            initialProducts.forEach(p => stmt.run(p.name, p.price, p.category, p.image));
            stmt.finalize();
            console.log("Database seeded with initial products.");
        }
    });
});

// CRUD ENDPOINTS
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    const sql = category ? 'SELECT * FROM products WHERE category = ?' : 'SELECT * FROM products';
    db.all(sql, category ? [category] : [], (err, rows) => {
        err ? res.status(500).json({ error: err.message }) : res.json(rows);
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, category, image } = req.body;
    db.run('INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)', [name, price, category, image], function(err) {
        err ? res.status(500).json({ error: err.message }) : res.status(201).json({ id: this.lastID });
    });
});

app.put('/api/products/:id', (req, res) => {
    const { name, price, category, image } = req.body;
    db.run('UPDATE products SET name = ?, price = ?, category = ?, image = ? WHERE id = ?', [name, price, category, image, req.params.id], (err) => {
        err ? res.status(500).json({ error: err.message }) : res.json({ message: "Updated" });
    });
});

app.delete('/api/products/:id', (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', req.params.id, (err) => {
        err ? res.status(500).json({ error: err.message }) : res.json({ message: "Deleted" });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));