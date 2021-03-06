import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(request, response){
    const checkIsProvider = await User.findOne({
      where: {id: request.userId, provider: true}
    });

    if(!checkIsProvider){
      return response.status(401).json({error: 'Only provider can load notifications'});
    }

    const notifications = await Notification.find({
      user: request.userId,
    }).sort({createdAt: -1}).limit(20);
    return response.json(notifications);
  }

  async update(request, response){
    const notification = await Notification.findByIdAndUpdate(
      request.params.id, {read: true}, {new:true});

    return response.json(notification);
  }

}

export default new NotificationController();