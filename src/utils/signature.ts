import authPayload from '@/utils/config'
import md5 from 'js-md5'

/**
 *
 * @param timestamp - 当前的时间戳
 * @returns - 签名
 */
export const createSignature = (timestamp: number): string => {
  return md5(`appkey=${authPayload.appkey}&timestamp=${timestamp}&random_str=${authPayload.randomStr}&key=${authPayload.masterSecret}`)
}
