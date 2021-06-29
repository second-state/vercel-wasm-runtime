use hex;
use std::io::{self, Read};
use image::{ImageOutputFormat, ImageFormat};

fn main() {
  let mut buf = Vec::new();
  io::stdin().read_to_end(&mut buf).unwrap();

  let image_format_detected: ImageFormat = image::guess_format(&buf).unwrap();
  let img = image::load_from_memory(&buf).unwrap();
  let filtered = img.grayscale();
  let mut buf = vec![];
  let format = match image_format_detected {
    ImageFormat::Gif => {
        filtered.write_to(&mut buf, ImageOutputFormat::Gif).unwrap();
        "gif"
    },
    _ => {
        filtered.write_to(&mut buf, ImageOutputFormat::Png).unwrap();
        "png"
    },
  };
  print!("{}{}", format, hex::encode(&buf));
}

