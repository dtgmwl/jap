import fs from 'fs';
import path from 'path';
import { Product, BlogArticle, CompanyInfo, HomepageData } from '@/types';

const dataDirectory = path.join(process.cwd(), 'data');

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readDirJson<T>(dirName: string): T[] {
  const dirPath = path.join(dataDirectory, dirName);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJsonFile<T>(path.join(dirPath, f)));
}

export function getCompanyInfo(): CompanyInfo {
  return readJsonFile<CompanyInfo>(path.join(dataDirectory, 'company.json'));
}

export function getAllProducts(): Product[] {
  return readDirJson<Product>('products');
}

export function getProductBySlug(slug: string): Product | undefined {
  const filePath = path.join(dataDirectory, 'products', `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return readJsonFile<Product>(filePath);
}

export function getAllBlogArticles(): BlogArticle[] {
  return readDirJson<BlogArticle>('blog');
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  const filePath = path.join(dataDirectory, 'blog', `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return readJsonFile<BlogArticle>(filePath);
}

export function getHomepageData(): HomepageData {
  return readJsonFile<HomepageData>(path.join(dataDirectory, 'homepage.json'));
}
