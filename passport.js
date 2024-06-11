

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Admin from './models/adminModel.js'; 
import User from './models/userModel.js'; 

const secret_key = process.env.JWT_SECRET_KEY;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_key
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const admin = await Admin.findById(jwtPayload.id);

    if (admin) {
      return done(null, admin);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

passport.use('user-jwt', new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
