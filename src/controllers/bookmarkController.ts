import Property from '../models/Property'
import Bookmark from '../models/Bookmark'

export default class BookmarkController {

    public static async create (req, res) {
        const userId = parseInt(req.headers.tenantId, 10);
        const { propertyId } = req.body;
    
        try {
            const propertyFound = await Property.findByPk(propertyId)
            if (!propertyFound) {
                return res.status(404).json({message: 'Property with Id not found'});
            }
        
            const bookmarkExists = await Bookmark.findOne({
                where: {
                    userId,
                    propertyId
                }
            });

            if (bookmarkExists) {
                return res.status(409).json({message:'Bookmark already exists'});
            }

            const bookmark = await Bookmark.create({userId, propertyId});
            const data : any = bookmark.toJSON();
            data.property = propertyFound.toJson();

            return res.status(201).json(data);

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async fetchAll (req, res) {
        try {
            const userId = parseInt(req.headers.tenantId, 10);

            const allBookmarks = await Bookmark.findAll({
                include: [Property],
                where: {
                    userId
                }
            });
            const bookmarks = allBookmarks.map((bookmark) => {
                return bookmark.toJSON()
            });
            res.status(200).json(bookmarks)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete (req, res) {
        try {
            const userId = parseInt(req.headers.tenantId, 10);
            const { propertyId } = req.body;
            const removedBookmark = await Bookmark.destroy({
                where: {
                    userId,
                    propertyId
                }
            });
            if (!removedBookmark) {
                return res.status(404).json({message: 'Bookmark not found'});
            }
            return res.status(200).json({message: 'Bookmark removed'});
        } catch (error) {
            console.log('ERROR', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}
