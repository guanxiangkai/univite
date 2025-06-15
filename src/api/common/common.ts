/**
 * 通用API接口
 * 包含系统配置、字典数据等通用接口
 */
import http from '@/utils/api/http';
import type { WebResponse } from '@/types';

/**
 * 字典项接口
 */
export interface DictItem {
  // 字典值
  value: string | number;
  // 字典标签
  label: string;
  // 字典排序
  sort?: number;
  // 字典状态
  status?: 'enabled' | 'disabled';
  // 备注
  remark?: string;
  // 子项目
  children?: DictItem[];
}

/**
 * 系统配置接口
 */
export interface SystemConfig {
  // 应用名称
  appName: string;
  // 应用版本
  appVersion: string;
  // 主题配置
  theme: {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
    [key: string]: string;
  };
  // 上传文件配置
  upload: {
    maxSize: number;
    allowTypes: string[];
    baseUrl: string;
  };
  // 其他配置项
  [key: string]: any;
}

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
   * 获取地区数据
   * @param parentCode 父级地区编码，不传则获取省级列表
   * @returns 地区列表
   */
  getRegions(parentCode?: string): Promise<WebResponse<Array<{
    code: string;
    name: string;
    level: number;
    parentCode?: string;
  }>>> {
    return http.get<Array<{
      code: string;
      name: string;
      level: number;
      parentCode?: string;
    }>>(parentCode ? `/api/system/region?parentCode=${parentCode}` : '/api/system/region');
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
