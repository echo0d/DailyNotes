# 2. Go练习-fscan

## 2.1. 存活主机顺序输出

Plugins目录下的icmp.go文件中CheckLive函数对应着探测存活主机功能，堆栈：

```
Plugins.CheckLive (c:\Users\18846\Desktop\fscan\Plugins\icmp.go:23)
Plugins.Scan (c:\Users\18846\Desktop\fscan\Plugins\scanner.go:27)
main.main (c:\Users\18846\Desktop\fscan\main.go:15)
```

![image-20240818193210381](./img/2_fscanPro/image-20240818193210381.png)

整体逻辑：`checkLive`函数中创建`chanHosts`通道，用channel接收多线程探测存活主机的结果。

修改：多线程里`chanHosts`中的IP不再实时输出，原本的打印逻辑注释掉，只保留扫描结果`AliveHosts`

```go
chanHosts := make(chan string, len(hostslist))
	go func() {
		for ip := range chanHosts {
			if _, ok := ExistHosts[ip]; !ok && IsContain(hostslist, ip) {
				ExistHosts[ip] = struct{}{}
				// if common.Silent == false {
				// 	if Ping == false {
				// 		fmt.Printf("(icmp) Target %-15s is alive\n", ip)
				// 	} else {
				// 		fmt.Printf("(ping) Target %-15s is alive\n", ip)
				// 	}
				// }
				AliveHosts = append(AliveHosts, ip)
			}
			livewg.Done()
		}
	}()
```

在`AliveHosts`返回之前对其进行排序并输出

```go
	// Sort the AliveHosts slice
	sort.Strings(AliveHosts)
	// Print sorted AliveHosts
	if Ping == false {
		for _, ip := range AliveHosts {
			fmt.Printf("(icmp) Target %-15s is alive\n", ip)
		}
	} else {
		for _, ip := range AliveHosts {
			fmt.Printf("(ping) Target %-15s is alive\n", ip)
		}
	}
	return AliveHosts
```

缺点：要等到全部存活探测结束才有输出

优点：有排序，不会太乱

但是，结果跑出来发现排序不对

![image-20240818214317217](./img/2_fscanPro/image-20240818214317217.png)

修改一下排序的逻辑，不直接用`sort.Strings`了,使用`net`包中的`ParseIP`函数，解析一下IP再排序

```go
	// sort.Strings(AliveHosts)
	sort.Slice(AliveHosts, func(i, j int) bool {
		return bytes.Compare(net.ParseIP(AliveHosts[i]).To4(), net.ParseIP(AliveHosts[j]).To4()) < 0
	})
```

这回应该没啥问题了，就是不知道效率被影响的程度，毕竟多解析了一遍IP，等用的时候再说吧

