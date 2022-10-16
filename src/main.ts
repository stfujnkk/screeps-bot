import { ErrorMapper } from '@/utils/errorMapper';

export const loop = ErrorMapper.wrapLoop(() => {
    console.log('Hello,Screeps!');
});