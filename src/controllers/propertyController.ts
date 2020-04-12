import Property from '../models/Property';
// import { Op } from 'sequelize';

export default class PropertyController {
  public static async create (req, res) {
    const returnedObject : any = {};
    try {
      const {
        name, description, propertyType, address, features, category, available
      } = req.body;
      const landlordId = parseInt(req.headers.landlordId, 10);

      const property = await Property.create({
        name,
        description,
        propertyType,
        address,
        features,
        category,
        available,
        landlordId
      });
      returnedObject.message = 'Property added successfully';
      returnedObject.property = property.toJson()

      res.status(201).json(returnedObject)
    } catch (error) {
      returnedObject.message = 'Internal server error'
      res.status(500).json(returnedObject)
    }
  }

  public static async update (req, res) {
    const returnedObject : any = {};
    try {
      const {
        name, description, propertyType, address, features, category, available
      } = req.body;
      const id = parseInt(req.params.id, 10);
      const updateData : any = {};

      if (name) { updateData.name = name }
      if (description) { updateData.description = description }
      if (propertyType) { updateData.propertyType = propertyType }
      if (address) { updateData.address = address }
      if (features) { updateData.features = features }
      if (category) { updateData.category = category }
      if (available !== null) { updateData.available = available }
      updateData.returning = true;
      updateData.plain = true;

      if (Object.entries(req.body).length === 0) {
        returnedObject.message = 'Please enter a value to be updated'
        return res.status(400).json(returnedObject);
      }

      const propertyFound = await Property.findOne({
        where: { id },
      });

      if (!propertyFound) {
        returnedObject.message = 'Property not found'
        return res.status(404).json(returnedObject)
      }

      if (parseInt(req.headers.landlordId, 10) !== propertyFound.landlordId) {
        returnedObject.message = 'You don\'t own this property';
        return res.status(403).json(returnedObject)
      }

      const property = await propertyFound.update(updateData);
      returnedObject.message = 'Property updated successfully';
      returnedObject.property = property.toJson();
      return res.status(200).json(returnedObject);
    } catch (error) {
      returnedObject.message = 'Internal server error';
      return res.status(500).json(returnedObject);
    }
  }

  public static async delete (req, res) {
    const returnedObject : any = {};
    try {
      const { landlordId } = req.headers;
      const { id } = req.params;

      const propertyFound = await Property.findOne({
        where: { id }
      });

      if (!propertyFound) {
        returnedObject.message = 'Property not found';
        return res.status(404).json(returnedObject)
      }

      if (parseInt(landlordId, 10) !== propertyFound.landlordId) {
        returnedObject.message = 'You don\'t own this property';
        return res.status(403).json(returnedObject)
      }

      await Property.destroy({ where: { id } });
      returnedObject.message = 'Property deleted successfully'

      return res.status(200).json(returnedObject);
    } catch (error) {
      returnedObject.message = 'Internal server error';
      return res.status(500).json(returnedObject);
    }
  }

  public static async fetchAll (req, res) {
    const returnedObject : any = {};
    try {
      returnedObject.properties = await Property.findAll();
      returnedObject.message = 'Properties returned successfully';

      return res.status(200).json(returnedObject);
    } catch (error) {
      returnedObject.message = 'Internal server error';
      return res.status(500).json(returnedObject);
    }
  }

  public static async fetchOne (req, res) {
    const returnedObject : any = {};
    try {
      const { id } = req.params;

      const propertyFound = await Property.findOne({
        where: { id }
      });

      if (!propertyFound) {
        returnedObject.message = 'Property not found';
        return res.status(404).json(returnedObject);
      }

      returnedObject.property = propertyFound.toJson();
      returnedObject.message = 'Property returned successfully';

      return res.status(200).json(returnedObject);
    } catch (error) {
      returnedObject.message = 'Internal server error';
      return res.status(500).json(returnedObject);
    }
  }
}
