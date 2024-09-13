let planets = [
    { id: 1, name: "Mercury" },
    { id: 2, name: "Venus" },
    { id: 3, name: "Earth" },
    { id: 4, name: "Mars" },
    { id: 5, name: "Saturn" },
  ];
  
  const Joi = require('joi');
  
  const planetSchema = Joi.object({
    name: Joi.string().min(3).required()
  });
  
  const getAll = (req, res) => {
    res.status(200).json(planets);
  };
  
  const getOneById = (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });
    res.status(200).json(planet);
  };
  
  const create = (req, res) => {
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    const newPlanet = {
      id: planets.length + 1,
      name: req.body.name
    };
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: 'Pianeta creato con successo' });
  };
  
  const updateById = (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });
  
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    planets = planets.map(p => p.id === parseInt(req.params.id) ? { ...p, name: req.body.name } : p);
    res.status(200).json({ msg: 'Pianeta aggiornato con successo' });
  };
  
  const deleteById = (req, res) => {
    const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));
    if (planetIndex === -1) return res.status(404).json({ msg: 'Pianeta non trovato' });
  
    planets = planets.filter(p => p.id !== parseInt(req.params.id));
    res.status(200).json({ msg: 'Pianeta cancellato con successo' });
  };
  
  module.exports = {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
  };  