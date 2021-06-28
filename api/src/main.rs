use std::fs::File;
use std::io::{self, Write, Read};
use image::{ImageOutputFormat, ImageFormat};

fn main() {
  let mut buf = Vec::new();
  io::stdin().read_to_end(&mut buf).unwrap();

  let image_format_detected: ImageFormat = image::guess_format(&buf).unwrap();
  let img = image::load_from_memory(&buf).unwrap();
  let filtered = img.grayscale();
  let mut buf = vec![];
  let out_path = match image_format_detected {
    ImageFormat::Gif => {
        filtered.write_to(&mut buf, ImageOutputFormat::Gif).unwrap();
        "/r.gif"
    },
    _ => {
        filtered.write_to(&mut buf, ImageOutputFormat::Png).unwrap();
        "/r.png"
    },
  };
  let mut output = File::create(out_path).unwrap();
  output.write_all(&buf).unwrap();
  println!("{}", out_path);
}

