//
//  CityTableViewCell.swift
//  WorldWeather
//
//  Created by Dan Xiaoyu Yu on 2/8/15.
//  Copyright (c) 2015 RayWenderlich. All rights reserved.
//

import UIKit

class CityTableViewCell: UITableViewCell {
    
    // Must create these outlets by hand for some reason.
    @IBOutlet weak var cityImageView: UIImageView!
    @IBOutlet weak var cityNameLabel: UILabel!
    
    var cityWeather: CityWeather? {
        didSet {
            configureCell()
        }
    }
    
    private func configureCell() {
        cityImageView.image = cityWeather?.cityImage
        cityNameLabel.text = cityWeather?.name
    }
}
