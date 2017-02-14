//
//  ViewController.h
//  example1
//
//  Created by 平山　真悟 on 2016/01/27.
//  Copyright © 2016年 平山　真悟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DetailViewController.h"

@interface TableViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

@property(nonatomic,weak) UITableView *tableView;
@property(nonatomic,strong) NSArray *dataSources;

@property(nonatomic,strong) DetailViewController *detailViewController;

@end

