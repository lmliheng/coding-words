Crontab
===

自动化工具


## 介绍
Crontab是一个强大的工具，可以轻松自动化的实现各种任务。无论是定时备份、日志清理，还是定时脚本执行，它都可以轻松搞定。这篇文章将带你一步步了解如何使用crontab来管理计划任务。
1. Crontab的基本格式
crontab的基本格式如下：

# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
  *  *  *  *  * user-name  command to be executed
每个星号对应一个时间字段，从左到右分别表示：

分钟 (0-59)

小时 (0-23)

日期 (1-31)

月份 (1-12)

星期 (0-7) (0和7都表示星期日)

user-name：表示计划任务的执行人（可选）
command to be executed：用执行的命令，可以是单个命令，也可以脚本。

举栗子：

如果你想每天凌晨1点同步一下阿里云的时间，可以这样写：

0 1 * * * /usr/sbin/ntpdate ntp.aliyun.com

如果你想每周一早上8点同步一下阿里云的时间，可以这样写：

0 8 * * 1 /usr/sbin/ntpdate ntp.aliyun.com

如果你想每月1号同步一下阿里云的时间，可以这样写：

0 0 1 * * /usr/sbin/ntpdate ntp.aliyun.com

2. Crontab进阶使用
2.1 间隔执行任务
想要每隔5分钟执行一次任务？crontab同样可以轻松实现：

*/5 * * * * /usr/sbin/ntpdate ntp.aliyun.com
再比如，每隔2小时执行一次任务：

0 */2 * * * /usr/sbin/ntpdate ntp.aliyun.com
2.2 特定时间段执行任务
假设你只想在工作日的每个小时的第10分钟和第40分钟执行任务，可以这样写：

10,40 * * * 1-5 /usr/sbin/ntpdate ntp.aliyun.com
2.3 使用特殊字符串
crontab支持一些特殊字符串来简化时间设置：

@hourly：每小时执行一次，相当于0 * * * *。

@daily 或 @midnight：每天执行一次，相当于0 0 * * *。

@weekly：每周执行一次，相当于0 0 * * 0。

@monthly：每月执行一次，相当于0 0 1 * *。

@yearly 或 @annually：每年执行一次，相当于0 0 1 1 *。

@reboot：系统启动时执行一次。

举栗子：

如果你想每天执行一个任务，可以这样写：

@daily /usr/sbin/ntpdate ntp.aliyun.com
 等同于
0 0 * * * /usr/sbin/ntpdate ntp.aliyun.com
3. 管理Crontab任务
3.1 查看当前用户的Crontab任务
crontab -l
3.2 编辑当前用户的Crontab任务
crontab -e
这会打开当前用户的crontab文件进行编辑。

3.3 删除当前用户的Crontab任务
crontab -r
这会删除当前用户的所有crontab任务。

4. 企业中常见的计划任务
4.1 每天凌晨2点备份数据库
0 2 * * * /usr/bin/mysqldump -u root -p123@456 zabbix > /var/lib/mysql/backup/zabbix_$(date +\%Y\%m\%d).sql
这个任务会在每天凌晨2点执行数据库备份。

4.2 每周日晚上11点清理临时文件
0 23 * * 0 /usr/bin/find /tmp -type f -mtime +7 -exec rm -f {} \;
这个任务会在每周日晚上11点执行，删除/tmp目录下所有超过7天的临时文件。

4.3 每小时检查系统负载
@hourly /usr/bin/uptime >> /var/log/system_load.log
这个任务会在每小时执行一次，将系统负载信息追加到日志文件中。

4.4 每小时同步本地目录与远程服务器
@hourly rsync -avz /usr/local/nginx/html/blog/ root@x.x.x.x:/usr/local/nginx/html/blog/
4.5 每天早上7点生成报表并发送邮件
0 7 * * * /usr/local/bin/it_report.sh | mail -s "$(date +\%Y\%m\%d) it report" lutixiaya@