

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Admin from './models/adminModel.js';  // Import the correct model

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

export default passport;
