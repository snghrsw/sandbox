//
//  DetailViewController.m
//  example1
//
//  Created by 平山　真悟 on 2016/01/27.
//  Copyright © 2016年 平山　真悟. All rights reserved.
//

#import "DetailViewController.h"

@interface DetailViewController ()

@end


@implementation DetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.title = @"detail view";
    self.view.backgroundColor = [UIColor colorWithRed:0.913 green:0.569 blue:0.594 alpha:1.000];
    
    self.nameLabel = [[UILabel alloc]initWithFrame: CGRectMake(20, 80, 100, 40)];
    self.ageLabel = [[UILabel alloc]initWithFrame: CGRectMake(20, 120, 100, 40)];
    self.addressLabel = [[UILabel alloc]initWithFrame: CGRectMake(20, 160, 100, 40)];
    self.backButton = [[UIButton alloc]initWithFrame: CGRectMake(20, 200, 100, 40)];
    [self.backButton setTitle:@"戻る" forState:UIControlStateNormal];
    
    [self.backButton addTarget:self action:@selector(onBack:) forControlEvents:UIControlEventTouchUpInside];
    
    [self.view addSubview:self.nameLabel];
    [self.view addSubview:self.ageLabel];
    [self.view addSubview:self.addressLabel];
    [self.view addSubview:self.backButton];

}

- (void)setResource:(NSDictionary *)resource{
    self.nameLabel.text = resource[@"name"];
    self.ageLabel.text = resource[@"age"];
    self.addressLabel.text = resource[@"address"];
}

-(IBAction)onBack:(UIButton *)sender{
    [self.navigationController popViewControllerAnimated:YES];
}

@end
