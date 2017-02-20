ALTER TABLE `order_modifiers` ADD CONSTRAINT `order_modifiers_order_id_foreign_idx` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
