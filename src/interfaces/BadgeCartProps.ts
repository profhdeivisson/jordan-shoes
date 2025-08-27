import { CartItem } from "./CartItemInterface";

export interface BadgeCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}