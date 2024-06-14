make
===

自动化构建工具

## 介绍
make是一个自动化构建工具，它可以根据一个名为Makefile的配置文件自动完成项目的编译、链接和其他任务。make主要用于C和C++项目，但也可以用于其他编程语言。它的主要目的是简化构建过程，避免手动重复执行一系列命令。

make的工作原理是通过解析Makefile中的规则来执行的。Makefile定义了一系列的目标（target）、依赖（dependency）和命令（command）。make会检查目标的依赖是否已经满足，如果没有满足，它会执行相应的命令来生成依赖，直到最终生成目标。

## 上手
以下是一个简单的Makefile示例：
```bash
CC = gcc
CFLAGS = -Wall
OBJFILES = main.o foo.o
TARGET = my_program

all: $(TARGET)

main.o: main.c
    $(CC) $(CFLAGS) -c $< -o $@

foo.o: foo.c
    $(CC) $(CFLAGS) -c $< -o $@

$(TARGET): $(OBJFILES)
    $(CC) $(OBJFILES) -o $(TARGET)

clean:
    rm -f $(OBJFILES) $(TARGET)
```
这个Makefile定义了以下变量和规则：

CC：编译器，这里是gcc。
CFLAGS：编译器选项，这里是-Wall，表示显示所有警告。
OBJFILES：目标文件列表，这里是main.o和foo.o。
TARGET：最终目标，这里是my_program。
all规则是默认规则，当只输入make而不带参数时，make会执行all规则。all规则依赖于$(TARGET)，即my_program。

main.o和foo.o规则分别描述了如何从main.c和foo.c生成对应的.o文件。这些规则依赖于对应的源文件。

$(TARGET)规则描述了如何将$(OBJFILES)链接成最终的可执行文件my_program。

clean规则用于清理生成的文件，通常在重新构建项目时使用。

要使用make工具，只需在包含Makefile的目录中输入make命令。

make会自动解析Makefile并执行相应的规则。还可以通过指定规则名称作为参数来执行特定规则，例如make clean。