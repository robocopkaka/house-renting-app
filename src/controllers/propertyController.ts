import Property from '../models/Property';

export default class PropertyController {
  public static async create (req, res) {
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

      res.status(201).json({
        message: 'Property added successfully',
        property: property.toJson()
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  public static async update (req, res) {
    try {
      if (Object.entries(req.body).length === 0) {
        return res.status(400).json({ message: 'Please enter a value to be updated' });
      }

      const {
        body: {
          name, description, propertyType, address, features, category, available
        }
      } = req;
      const landlordId = parseInt(req.headers.landlordId, 10);

      const id = parseInt(req.params.id, 10);

      const propertyFound = await Property.findOne({
        where: { id },
      });

      if (!propertyFound) {
        return res.status(404).json({ message: 'Property not found' })
      }

      if (parseInt(req.headers.landlordId, 10) !== propertyFound.landlordId) {
        return res.status(403).json({
          message: 'You are not authorized to update this property'
        });
      }

      const property = await propertyFound.update({
        name,
        description,
        propertyType,
        address,
        features,
        category,
        available,
        landlordId,
        returning: true,
        plain: true
      });

      return res.status(200).json({
        message: 'Property updated successfully',
        property: property.toJson()
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async delete (req, res) {
    try {
      const { headers: { landlordId }, params: { id } } = req;

      const propertyFound = await Property.findOne({
        where: { id }
      });

      if (!propertyFound) {
        return res.status(404).json({ message: 'Property not found' })
      }

      if (parseInt(landlordId, 10) !== propertyFound.landlordId) {
        return res.status(403).json({
          message: 'You are not authorized to delete this property'
        })
      }

      await Property.destroy({ where: { id } });

      return res.status(200).json({
        message: 'Property deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async fetchAll (req, res) {
    try {
      const { category } = req.query;
      let whereQuery = {}
      if (category) {
         whereQuery = { where: {
          category
        }}
      }

      const properties = await Property.findAll(whereQuery);

      if (properties.length === 0) {
        return res.status(404).json({
          message: 'No Property Found',
        });

      }

      return res.status(200).json({
        message: 'Properties returned successfully',
        properties
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async fetchOne (req, res) {
    try {
      const { id } = req.params;

      const propertyFound = await Property.findOne({
        where: { id }
      });

      if (!propertyFound) {
        return res.status(404).json({ message: 'Property not found' });
      }

      const property = propertyFound.toJson();

      return res.status(200).json({
        message: 'Property returned successfully',
        property
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
