import { Item } from './item.interface';

export interface Ordenventa {
    sell: {fecha: Date, cantidad: number},
    items: Item[]
}
