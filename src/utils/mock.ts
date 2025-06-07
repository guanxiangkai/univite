import {faker} from '@faker-js/faker/locale/zh_CN';

/**
 * Mock 数据工具类
 */
export class MockUtils {
  /**
   * 生成随机用户数据
   * @param count 生成数量
   * @returns 用户数据数组
   */
  static generateUsers(count = 10) {
    return Array.from({length: count}).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      createdAt: faker.date.recent(),
    }));
  }

  /**
   * 生成随机商品数据
   * @param count 生成数量
   * @returns 商品数据数组
   */
  static generateProducts(count = 10) {
    return Array.from({length: count}).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      category: faker.commerce.department(),
      createdAt: faker.date.recent(),
    }));
  }

  /**
   * 生成随机订单数据
   * @param count 生成数量
   * @returns 订单数据数组
   */
  static generateOrders(count = 10) {
    return Array.from({length: count}).map(() => ({
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      productId: faker.string.uuid(),
      quantity: faker.number.int({min: 1, max: 5}),
      totalPrice: Number(faker.commerce.price()),
      status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
      createdAt: faker.date.recent(),
    }));
  }

  /**
   * 生成随机评论数据
   * @param count 生成数量
   * @returns 评论数据数组
   */
  static generateComments(count = 10) {
    return Array.from({length: count}).map(() => ({
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      productId: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      rating: faker.number.int({min: 1, max: 5}),
      createdAt: faker.date.recent(),
    }));
  }
}
