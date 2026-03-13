-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: codeword
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `word_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '词汇名称',
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '标签（分类）',
  `content` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件路径（指向对应md文件）',
  `support_user_id` int DEFAULT '0' COMMENT '提供用户ID',
  `read_time` int DEFAULT '0' COMMENT '阅读',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_word_name` (`word_name`),
  KEY `idx_word_name` (`word_name`),
  KEY `idx_tag` (`tag`),
  KEY `idx_support_user_id` (`support_user_id`),
  KEY `idx_read_time` (`read_time`),
  CONSTRAINT `chk_read_time` CHECK ((`read_time` >= 0)),
  CONSTRAINT `chk_support_user` CHECK ((`support_user_id` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='词汇表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (2,'单例模式','[\"前端\",\"后端\"]','111',1,23,'2026-03-10 03:21:38','2026-03-12 16:31:00'),(4,'java','[\"后端\"]','java\n===\n\n面向对象编程语言\n\n## java',1,63,'2026-03-10 03:26:23','2026-03-12 16:31:00'),(5,'Crontab','[\"后端\"]','Crontab.md',1,8,'2026-03-10 05:28:36','2026-03-12 16:31:00'),(6,'make','[\"后端\"]','make.md',1,6,'2026-03-10 05:29:14','2026-03-12 16:31:00'),(7,'openSSL','[\"区块链\"]','openSSL.md',1,5,'2026-03-10 05:29:39','2026-03-12 16:31:00'),(8,'pgAdmin','[\"后端\"]','pgAdmin.md',1,0,'2026-03-10 05:29:54','2026-03-12 16:31:00'),(9,'HTML DOM Input Search 对象','[\"前端\"]','1',1,0,'2026-03-11 13:45:52','2026-03-12 16:31:00'),(10,'HTML DOM Document 对象','[\"前端\"]','1',1,0,'2026-03-11 13:45:58','2026-03-12 16:31:00'),(11,'CSS中<a>标签的属性归类','[\"前端\"]','CSS主要通过伪类来管理<a>标签的不同交互状态，并结合盒模型、视觉效果、布局等属性来定义其最终外观和行为，实现从基础链接到复杂交互组件的样式控制。在CSS中，通常不直接设置<a>标签的属性（如href），而是通过CSS选择器来为其添加样式。\n',1,1,'2026-03-11 14:00:49','2026-03-12 16:31:00'),(12,'JSON格式','[\"前端\"]','11',1,0,'2026-03-11 14:15:06','2026-03-12 16:31:00'),(13,'logo设计网站汇总','[\"艺术\"]','钙网 https://www.uugai.com/',1,1,'2026-03-11 15:01:15','2026-03-12 16:31:00'),(14,'抠图网站推荐','[\"艺术\"]','https://www.remove.bg/',1,0,'2026-03-11 15:25:32','2026-03-12 16:31:00'),(15,'中文网页中的字体选型及开发指南','[\"前端\"]','https://weixiang.github.io/posts/the-font-selection-and-development-guide-in-chinese-web-pages/',1,4,'2026-03-11 15:40:58','2026-03-12 16:31:00'),(16,'CSS <text>文本溢出 CSS 截断','[\"前端\"]','1',1,2,'2026-03-11 15:52:38','2026-03-12 16:31:00'),(17,'css<input>密码框密码的隐显','[\"前端\"]','<input type=\"password\" placeholder=\"密码\" data-password=\"password\">',1,0,'2026-03-11 16:11:16','2026-03-12 16:31:00'),(18,'实现注册业务中的邮箱验证码功能','[\"前端\",\"后端\",\"移动开发\"]','https://blog.csdn.net/qq_42263280/article/details/129584017',1,0,'2026-03-12 08:59:40','2026-03-12 16:31:00'),(19,'聚合登录的实现','[\"前端\"]','https://uniqueker.top/',1,0,'2026-03-12 09:07:33','2026-03-12 16:31:00'),(20,'HTML自定义模态框优选大全','[\"前端\"]','111',5,0,'2026-03-12 15:53:42','2026-03-12 15:53:42');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-13 11:24:50
