-- 如果表已存在，先删除
DROP TABLE IF EXISTS `word`;

-- 创建 word 表
CREATE TABLE `word` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `word_name` VARCHAR(255) NOT NULL COMMENT '词汇名称',
  `tag` VARCHAR(100) DEFAULT '' COMMENT '标签（分类）',
  `content` VARCHAR(500) NOT NULL COMMENT '文件路径（指向对应md文件）',
  `support_user_id` int DEFAULT 0 COMMENT '提供用户ID',
  `read_time` INT DEFAULT 0 COMMENT '阅读',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_word_name` (`word_name`),
  INDEX `idx_tag` (`tag`),
  INDEX `idx_support_user_id` (`support_user_id`),
  INDEX `idx_read_time` (`read_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='词汇表';

-- 添加唯一索引，确保word_name唯一
ALTER TABLE `word` ADD UNIQUE INDEX `uk_word_name` (`word_name`);

-- 添加检查约束（MySQL 8.0+）
ALTER TABLE `word` 
ADD CONSTRAINT `chk_read_time` CHECK (`read_time` >= 0),
ADD CONSTRAINT `chk_support_user` CHECK (`support_user_id` >= 0);