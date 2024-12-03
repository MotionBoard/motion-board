import {cache} from 'react';
import {UserRepository} from '@server/repositories/user.repository';

export const userCache = cache(UserRepository.getUser);