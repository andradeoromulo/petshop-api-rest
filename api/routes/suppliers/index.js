const router = require('express').Router();
const Supplier = require('./Supplier');

router.get('/', async (req, res) => {
    const result = await Supplier.list();
    res.send(JSON.stringify(result));
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.load();
        res.send(JSON.stringify(supplier));
    } catch(err) {
        res.send(JSON.stringify({
            message: err.message
        }));
    }
});

router.post('/', async (req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.create();
    res.send(JSON.stringify(supplier));
});

module.exports = router;