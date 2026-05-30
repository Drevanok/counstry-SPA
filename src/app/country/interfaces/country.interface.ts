import { ByRegionPage } from '../pages/by-region-page/by-region-page';
export interface Country {
    cca2: string;
    flag: string;
    flagSvg: string;
    name: string;
    capital: string;
    population: number;

    region: string;
    subRegion: string;
}