# About this project

This project aims to provide a visualization tool for four different emission types.

- Carbonmonxide
- Methane
- Nitrogendioxide
- Ozone

The data stems from the <a href="https://emissions-api.org/" title="emission-link">Emission API</a> which takes satelite data from the Sentinel-5P-Satelite and translates it into more usable JSON data. 

>The method used to estimate the concentrations of the chemical compounds is spectrophotometry. You can think of this as a camera with more than just your usual RGB-values, also extending into wavelengths not visible to the human eye. So the spectrophotometer on the Sentinel-5P satellite takes pictures of the earth and each pixel corresponds to one measurement point (it does so actually not so much in the way of a conventional photo that is two dimensional, but rather one line at a time, [like a scanner](https://youtu.be/vQS7Ldc7Q_Q)). This raw data is the [Level-0 data product](https://sentinel.esa.int/web/sentinel/missions/sentinel-5p/data-products) provided by the ESA. The concentrations of chemical compounds can then be inferred from the absorption of light they cause in different wavelengths (https://directory.eoportal.org/web/eoportal/satellite-missions/c-missions/copernicus-sentinel-5p#sensors)). Luckily, the ESA also provides this derived information in form of their [Level-2 data products](https://sentinel.esa.int/web/sentinel/technical-guides/sentinel-5p/products-algorithms), which are the ones we are using as a basis for Emissions API.



# Technical Aspects

The dashboard is running on **React.s**, additional tools I used to help visualize the map, graph and general stylings were **MapBox**, **DeckGL**, **sylting-components**, **Graph.js**, **Framer-Motion**.

When playing around with the dashboard one notices that not all data is always present, which stems from the fact that the satelite measurements needs light and the measurements are the sum of the concentrations of a compound between the earth’s surface and the satellite rather than ground values. 

# About Me


My Name is Philipp Bischoff and I'm a recent university graduate currently looking to launch my career.  I used this project primairly to get acquianted with the front-end Stack (HTML, CSS, JS etc.) as I have not made any contact with these technologies throughout my degree. I am presonally very interested in environmental issues and are always intrigued by what data can show and tell us about the world and about ourselves, which is why I wanted to coat my learning journey in a topic that is find personally interesting.

 I'm hoping to find a place to which I can contribute to with my skills and an environment that allows me to learn and grow. What I personally enjoy about software engineering in general is the endless opportunities to learn and improve your own capabilities.

Feel free to contact me on my <a href="www.linkedin.com/in/philipp-bischoff" title="linkedin">LinkedIn</a>!

# Possible Improvements

I personally would have liked to make the app responsive on multiple sizes and devices. So far it only works on full size. desktop screens but I wanted to avoid falling into the "it's not done yet"-pitfall and eventually decided, that besiedes all it's possible improvements, I will finish it, once I get to all the functionality that I originally set out to implement. Working on this projet, I learned that it is very important to have a visual and architectural concept before you start coding, which is something I will definitley do better in my next projects. Because I didn't do this properly I also wasn't able to properly use the modularity of React towards my advantage.
