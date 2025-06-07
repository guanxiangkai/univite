// 定义路由类型
export interface Route {
    path: string;
    name?: string;
    meta?: Record<string, any>;
}
