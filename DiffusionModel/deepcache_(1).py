# -*- coding: utf-8 -*-
"""DeepCache (1).ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/10apnbpKq--42ANmrYZLsAkeg2QpXcC8t

## 0. Install Packages and Requirements
"""

!git clone https://github.com/horseee/DeepCache.git

# Commented out IPython magic to ensure Python compatibility.
!pip install diffusers
!pip install matplotlib
# %cd DeepCache

"""## 1. Running the Original Stable Diffusion Pipeline"""

import time
import torch
import matplotlib.pyplot as plt
from diffusers import StableDiffusionPipeline

def set_random_seed(seed):
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

baseline_pipe = StableDiffusionPipeline.from_pretrained(
    'runwayml/stable-diffusion-v1-5',
    torch_dtype=torch.float16
).to("cuda:0")

prompt = "house in water "

set_random_seed(42)
start_time = time.time()

origin_output = baseline_pipe(
    prompt, output_type='pt', return_dict=True
).images
use_time = time.time() - start_time

"""## 2. Running the Stable Diffusion Pipeline + DeepCache"""

!pip install --upgrade DeepCache

from DeepCache import *

x

set_random_seed(42)
start_time = time.time()
deepcache_output = deepcache_pipe(
    prompt,
    cache_interval=5, cache_layer_id=0, cache_block_id=0, uniform=True,
    output_type='pt', return_dict=True
).images
deepcache_use_time = time.time() - start_time

f, axarr = plt.subplots(1,2)
axarr[0].imshow(origin_output[0].cpu().float().permute(1, 2, 0))
axarr[0].axis('off')
axarr[0].set_title('Original: {:.2f}s'.format(use_time))

axarr[1].imshow(deepcache_output[0].cpu().float().permute(1, 2, 0))
axarr[1].axis('off')
axarr[1].set_title('with DeepCache: {:.2f}s'.format(deepcache_use_time))

plt.savefig('output_image.png', bbox_inches='tight', pad_inches=0.1)

# Show the plot
plt.show()

ig, ax = plt.subplots()

# Plot the deepcache
ax.imshow(deepcache_output[0].cpu().float().permute(1, 2, 0))
ax.axis('off')
ax.set_title('with DeepCache: {:.2f}s'.format(deepcache_use_time))

# Save only the deepcache plot to a PNG file
plt.savefig('deepcache_output.png', bbox_inches='tight', pad_inches=0.1)

# Show only the deepcache plot
plt.show()

import time
import matplotlib.pyplot as plt

# ... (your existing code)

# Create a figure for the original plot
fig, ax = plt.subplots()

# Plot the original
ax.imshow(origin_output[0].cpu().float().permute(1, 2, 0))
ax.axis('off')
ax.set_title('Original: {:.2f}s'.format(use_time))

# Save only the original plot to a PNG file
plt.savefig('original_output.png', bbox_inches='tight', pad_inches=0.1)

# Show only the original plot
plt.show()

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, world from Saturn!'

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8084)