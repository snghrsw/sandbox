//
//  UIColor+Hex.h
//  example1
//
//  Created by 平山　真悟 on 2016/01/27.
//  Copyright © 2016年 平山　真悟. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (Hex)

+ (UIColor*)colorWithHexString:(NSString *)hex;
+ (UIColor*)colorWithHexString:(NSString *)hex alpha:(CGFloat)a;

@end
