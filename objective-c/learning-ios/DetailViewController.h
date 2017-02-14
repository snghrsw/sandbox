//
//  DetailViewController.h
//  example1
//
//  Created by 平山　真悟 on 2016/01/27.
//  Copyright © 2016年 平山　真悟. All rights reserved.
//

#import <UIKit/UIKit.h>



@interface DetailViewController : UIViewController 

- (void)setResource:(NSDictionary *)resource;

@property(strong, nonatomic) UILabel *nameLabel;
@property(strong, nonatomic) UILabel *addressLabel;
@property(strong, nonatomic) UILabel *ageLabel;

@property(strong, nonatomic) UIButton *backButton;
-(IBAction)onBack:(UIButton *)sender;

@end
