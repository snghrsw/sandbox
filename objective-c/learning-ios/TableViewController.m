//
//  ViewController.m
//  example1
//
//  Created by 平山　真悟 on 2016/01/27.
//  Copyright © 2016年 平山　真悟. All rights reserved.
//

#import "TableViewController.h"
#import "DetailViewController.h"
#import "UIColor+Hex.h"

@interface TableViewController () <UITableViewDelegate, UITableViewDataSource>

@end

@implementation TableViewController



- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.title = @"table view";
    self.view.backgroundColor = [UIColor colorWithRed:0.397 green:0.623 blue:0.910 alpha:1];
    
    UITableView *table = [[UITableView alloc]initWithFrame:CGRectMake(0,0,self.view.frame.size.width,self.view.frame.size.height)];
    [self.view addSubview:table];

    self.tableView = table;
    self.tableView.delegate = self;
    self.tableView.dataSource = self;

    self.dataSources = @[
                         @{
                             @"name": @"田中太郎",
                             @"age": @"23",
                             @"address": @"東京都"
                             },
                         @{
                             @"name": @"斎藤士郎",
                             @"age": @"35",
                             @"address": @"千葉県"
                             },
                         @{
                             @"name": @"遠藤菊蔵",
                             @"age": @"43",
                             @"address": @"埼玉県"
                             }
                         ];
    
    self.detailViewController = [[DetailViewController alloc]init];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return self.dataSources.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
    }
    
    cell.textLabel.text = [NSString stringWithFormat:@"%@", self.dataSources[indexPath.row][@"name"]];
    cell.backgroundColor = [UIColor colorWithRed:0.558 green:0.720 blue:0.940 alpha:1.000];
    
    return cell;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    NSLog(@"%ld",(long)indexPath.row);
    
    [self.navigationController pushViewController:self.detailViewController animated:YES];
    [self.detailViewController setResource:self.dataSources[indexPath.row]];
}


@end
