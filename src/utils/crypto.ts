/**
 * 加密工具类（基于 Web Crypto API）
 */
export class CryptoUtils {
  private static encoder = new TextEncoder();
  private static decoder = new TextDecoder();

  /**
   * 生成随机密钥
   * @param algorithm 加密算法，默认为 AES-GCM
   * @returns Promise<CryptoKey> 生成的密钥
   */
  static async generateKey(algorithm: 'AES-GCM' | 'AES-CBC' = 'AES-GCM'): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: algorithm,
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * 从密钥字符串导入密钥
   * @param keyString Base64 格式的密钥字符串
   * @param algorithm 加密算法，默认为 AES-GCM
   * @returns Promise<CryptoKey> 导入的密钥
   */
  static async importKey(keyString: string, algorithm: 'AES-GCM' | 'AES-CBC' = 'AES-GCM'): Promise<CryptoKey> {
    const keyData = this.base64ToArrayBuffer(keyString);
    return await crypto.subtle.importKey('raw', keyData, {name: algorithm}, false, ['encrypt', 'decrypt']);
  }

  /**
   * 导出密钥为字符串
   * @param key CryptoKey 对象
   * @returns Promise<string> Base64 格式的密钥字符串
   */
  static async exportKey(key: CryptoKey): Promise<string> {
    const keyData = await crypto.subtle.exportKey('raw', key);
    return this.arrayBufferToBase64(keyData);
  }

  /**
   * AES-GCM 加密
   * @param data 待加密的数据（字符串）
   * @param key 密钥（CryptoKey 对象或 Base64 字符串）
   * @returns Promise<string> Base64 格式的加密结果
   */
  static async encryptAesGcm(data: string, key: CryptoKey | string): Promise<string> {
    try {
      // 如果 key 是字符串，则导入密钥
      const cryptoKey = typeof key === 'string' ? await this.importKey(key, 'AES-GCM') : key;

      // 生成随机 IV (初始化向量)
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // 加密数据
      const dataBuffer = this.strToArrayBuffer(data);
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        cryptoKey,
        dataBuffer
      );

      // 将 IV 和加密数据合并
      const result = new Uint8Array(iv.length + encryptedData.byteLength);
      result.set(iv);
      result.set(new Uint8Array(encryptedData), iv.length);

      // 返回 Base64 编码的结果
      return this.arrayBufferToBase64(result.buffer);
    } catch (error) {
      console.error('AES-GCM 加密失败:', error);
      throw error;
    }
  }

  /**
   * AES-GCM 解密
   * @param encryptedData Base64 格式的加密数据
   * @param key 密钥（CryptoKey 对象或 Base64 字符串）
   * @returns Promise<string> 解密后的字符串
   */
  static async decryptAesGcm(encryptedData: string, key: CryptoKey | string): Promise<string> {
    try {
      // 如果 key 是字符串，则导入密钥
      const cryptoKey = typeof key === 'string' ? await this.importKey(key, 'AES-GCM') : key;

      // 将 Base64 转换为 ArrayBuffer
      const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);
      const encryptedArray = new Uint8Array(encryptedBuffer);

      // 提取 IV (前 12 字节)
      const iv = encryptedArray.slice(0, 12);

      // 提取加密数据
      const ciphertext = encryptedArray.slice(12);

      // 解密数据
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        cryptoKey,
        ciphertext
      );

      // 将 ArrayBuffer 转换为字符串
      return this.arrayBufferToStr(decryptedBuffer);
    } catch (error) {
      console.error('AES-GCM 解密失败:', error);
      throw error;
    }
  }

  /**
   * AES-CBC 加密
   * @param data 待加密的数据（字符串）
   * @param key 密钥（CryptoKey 对象或 Base64 字符串）
   * @returns Promise<string> Base64 格式的加密结果
   */
  static async encryptAesCbc(data: string, key: CryptoKey | string): Promise<string> {
    try {
      // 如果 key 是字符串，则导入密钥
      const cryptoKey = typeof key === 'string' ? await this.importKey(key, 'AES-CBC') : key;

      // 生成随机 IV (初始化向量)
      const iv = crypto.getRandomValues(new Uint8Array(16));

      // 加密数据
      const dataBuffer = this.strToArrayBuffer(data);
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv,
        },
        cryptoKey,
        dataBuffer
      );

      // 将 IV 和加密数据合并
      const result = new Uint8Array(iv.length + encryptedData.byteLength);
      result.set(iv);
      result.set(new Uint8Array(encryptedData), iv.length);

      // 返回 Base64 编码的结果
      return this.arrayBufferToBase64(result.buffer);
    } catch (error) {
      console.error('AES-CBC 加密失败:', error);
      throw error;
    }
  }

  /**
   * AES-CBC 解密
   * @param encryptedData Base64 格式的加密数据
   * @param key 密钥（CryptoKey 对象或 Base64 字符串）
   * @returns Promise<string> 解密后的字符串
   */
  static async decryptAesCbc(encryptedData: string, key: CryptoKey | string): Promise<string> {
    try {
      // 如果 key 是字符串，则导入密钥
      const cryptoKey = typeof key === 'string' ? await this.importKey(key, 'AES-CBC') : key;

      // 将 Base64 转换为 ArrayBuffer
      const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);
      const encryptedArray = new Uint8Array(encryptedBuffer);

      // 提取 IV (前 16 字节)
      const iv = encryptedArray.slice(0, 16);

      // 提取加密数据
      const ciphertext = encryptedArray.slice(16);

      // 解密数据
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv,
        },
        cryptoKey,
        ciphertext
      );

      // 将 ArrayBuffer 转换为字符串
      return this.arrayBufferToStr(decryptedBuffer);
    } catch (error) {
      console.error('AES-CBC 解密失败:', error);
      throw error;
    }
  }

  /**
   * SHA-256 哈希
   * @param data 待哈希的数据（字符串）
   * @returns Promise<string> Base64 格式的哈希结果
   */
  static async sha256(data: string): Promise<string> {
    try {
      const dataBuffer = this.strToArrayBuffer(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      return this.arrayBufferToBase64(hashBuffer);
    } catch (error) {
      console.error('SHA-256 哈希失败:', error);
      throw error;
    }
  }

  /**
   * HMAC-SHA256 签名
   * @param data 待签名的数据（字符串）
   * @param keyString 密钥字符串（Base64 格式）
   * @returns Promise<string> Base64 格式的签名结果
   */
  static async hmacSha256(data: string, keyString: string): Promise<string> {
    try {
      // 导入 HMAC 密钥
      const keyData = this.base64ToArrayBuffer(keyString);
      const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        {name: 'HMAC', hash: 'SHA-256'},
        false,
        ['sign']
      );

      // 计算 HMAC
      const dataBuffer = this.strToArrayBuffer(data);
      const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataBuffer);
      return this.arrayBufferToBase64(signatureBuffer);
    } catch (error) {
      console.error('HMAC-SHA256 签名失败:', error);
      throw error;
    }
  }

  /**
   * 生成随机字符串
   * @param length 字符串长度
   * @returns 随机字符串
   */
  static generateRandomString(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, length);
  }

  /**
   * 字符串转 ArrayBuffer
   * @param str 字符串
   * @returns ArrayBuffer
   */
  private static strToArrayBuffer(str: string): ArrayBuffer {
    return this.encoder.encode(str).buffer;
  }

  /**
   * ArrayBuffer 转字符串
   * @param buffer ArrayBuffer
   * @returns 字符串
   */
  private static arrayBufferToStr(buffer: ArrayBuffer): string {
    return this.decoder.decode(new Uint8Array(buffer));
  }

  /**
   * ArrayBuffer 转 Base64 字符串
   * @param buffer ArrayBuffer
   * @returns Base64 字符串
   */
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return uni.arrayBufferToBase64(buffer);
  }

  /**
   * Base64 字符串转 ArrayBuffer
   * @param base64 Base64 字符串
   * @returns ArrayBuffer
   */
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    return uni.base64ToArrayBuffer(base64);
  }
}
