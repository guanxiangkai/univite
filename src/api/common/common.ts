/**
 * 通用API接口
 * 包含系统配置、字典数据等通用接口
 */
import http from '@/utils/api/http';
import type {DictItem, SystemConfig, WebResponse} from '@/types';

/**
 * 通用API类
 */
class CommonAPI {
  /**
   * 获取字典数据
   * @param dictType 字典类型编码
   * @returns 字典数据列表
   */
  getDictData(dictType: string): Promise<WebResponse<DictItem[]>> {
    return http.get<DictItem[]>(`/api/system/dict/data/${dictType}`);
  }

  /**
   * 获取系统配置
   * @returns 系统配置信息
   */
  getSystemConfig(): Promise<WebResponse<SystemConfig>> {
    return http.get<SystemConfig>('/api/system/config');
  }

  /**
   * 上传文件
   * @param file 文件对象
   * @param type 文件类型标识（可选）
   * @returns 文件上传结果
   */
  uploadFile(file: File, type?: string): Promise<WebResponse<{
    url: string;
    name: string;
    size: number;
    type: string;
  }>> {
    const formData = new FormData();
    formData.append('file', file);
    if (type) {
      formData.append('type', type);
    }

    return http.post<{
      url: string;
      name: string;
      size: number;
      type: string;
    }, FormData>('/api/system/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * 获取服务器时间
   * @returns 服务器时间
   */
  getServerTime(): Promise<WebResponse<{ timestamp: number; formatted: string }>> {
    return http.get<{ timestamp: number; formatted: string }>('/api/system/time');
  }
}

// 导出通用API实例
export const commonAPI = new CommonAPI();
