import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Palette,
  Mountain,
  Edit3,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/wedding-dance-golden-hour.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative text-center text-white max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Khoảnh khắc <span className="text-primary">vĩnh cửu</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Chụp hình cưới • Makeup • Ngoại cảnh • Chỉnh sửa chuyên nghiệp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
            >
              Xem Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-3 bg-transparent"
            >
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
              Dịch vụ của chúng tôi
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đầy đủ các dịch vụ để biến ngày cưới của bạn
              thành kỷ niệm đẹp nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-3">
                  Chụp hình cưới
                </h4>
                <p className="text-muted-foreground mb-4">
                  Ghi lại những khoảnh khắc đẹp nhất trong ngày trọng đại của
                  bạn
                </p>
                <Badge variant="secondary">Chuyên nghiệp</Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-3">
                  Makeup cô dâu
                </h4>
                <p className="text-muted-foreground mb-4">
                  Trang điểm hoàn hảo giúp bạn tỏa sáng trong ngày cưới
                </p>
                <Badge variant="secondary">Sang trọng</Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mountain className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-3">
                  Chụp ngoại cảnh
                </h4>
                <p className="text-muted-foreground mb-4">
                  Bộ ảnh cưới lãng mạn tại những địa điểm đẹp nhất
                </p>
                <Badge variant="secondary">Lãng mạn</Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Edit3 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-3">
                  Chỉnh sửa ảnh/video
                </h4>
                <p className="text-muted-foreground mb-4">
                  Hậu kỳ chuyên nghiệp tạo nên những tác phẩm hoàn hảo
                </p>
                <Badge variant="secondary">Tinh tế</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wedding Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
              ALBUM STUDIO HÀN QUỐC
            </h3>
            <p className="text-lg text-muted-foreground">Sài Gòn - 2025</p>
          </div>

          {/* Sample Photos */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/korean-wedding-couple.png"
                alt="Wedding Studio Photo 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/placeholder-s979k.png"
                alt="Wedding Studio Photo 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/korean-wedding-portrait.png"
                alt="Wedding Studio Photo 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Package Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Album Studio 1 */}
            <Card className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-serif font-bold mb-2">
                    ALBUM STUDIO 1
                  </h4>
                  <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                </div>

                <div className="space-y-3 text-center mb-8">
                  <p className="text-muted-foreground">
                    Chụp ảnh với 3 background Hàn Quốc
                  </p>
                  <p className="text-muted-foreground">Makeup & làm tóc</p>
                  <p className="text-muted-foreground">
                    2 Váy - 2 Vest - 1 TPTC
                  </p>
                  <div className="border-t border-border pt-3 mt-4">
                    <p className="text-muted-foreground">1 Ảnh ép gỗ 60x90cm</p>
                    <p className="text-muted-foreground">
                      Chỉnh sửa 25 ảnh theo công nghệ mới
                    </p>
                    <p className="text-muted-foreground">
                      1 Album cao cấp 22x30cm, 20 trang
                    </p>
                    <p className="text-muted-foreground">5 Ảnh ép gỗ 13x18cm</p>
                    <p className="text-muted-foreground">1 Slide show</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">
                    7.900.000₫
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Chọn gói này
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Album Studio 2 */}
            <Card className="border-2 border-primary bg-primary/5 hover:border-primary transition-colors">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="mb-2 bg-primary">Phổ biến</Badge>
                  <h4 className="text-2xl font-serif font-bold mb-2">
                    ALBUM STUDIO 2
                  </h4>
                  <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                </div>

                <div className="space-y-3 text-center mb-8">
                  <p className="text-muted-foreground">
                    Chụp ảnh với 4 background Hàn Quốc
                  </p>
                  <p className="text-muted-foreground">Makeup & làm tóc</p>
                  <p className="text-muted-foreground">
                    2 Váy - 2 Vest - 2 TPTC
                  </p>
                  <div className="border-t border-border pt-3 mt-4">
                    <p className="text-muted-foreground">1 Ảnh ép gỗ 60x90cm</p>
                    <p className="text-muted-foreground">
                      Chỉnh sửa 30 ảnh theo công nghệ mới
                    </p>
                    <p className="text-muted-foreground">
                      1 Album cao cấp 22x30cm, 30 trang
                    </p>
                    <p className="text-muted-foreground">5 Ảnh ép gỗ 13x18cm</p>
                    <p className="text-muted-foreground">1 Slide show</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">
                    8.900.000₫
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Chọn gói này
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Offer */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-serif font-bold text-primary mb-2">
                    WEDDING DREAMS NOW
                  </h4>
                  <p className="text-lg font-semibold">
                    Dịch vụ độc quyền tại Wedding Dreams
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">
                      Khách hàng nhận toàn bộ trong vòng 24h sau khi chụp ảnh:
                    </p>
                    <p>• Phụ thu 2.000.000đ</p>
                    <p>• Đã bao gồm phụ kiện, hoa lụa cao cấp</p>
                  </div>
                  <div>
                    <p>
                      • Trang phục tự chọn (TPTC) đầu về tự chuẩn bị. Chưa bao
                      gồm đồ sơ mi, giày tây, giày cao gót và trang sức.
                    </p>
                    <p>
                      • Chưa bao gồm phát sinh về lương sản phẩm dịch vụ và hoa
                      gian. Hai bên sẽ thống nhất về chi phí trước ngày chụp.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
              Portfolio
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Những khoảnh khắc đẹp nhất mà chúng tôi đã ghi lại
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <Image
                  src={`/beautiful-wedding-photography.png?height=400&width=400&query=beautiful wedding photography ${item} romantic couple golden hour`}
                  alt={`Wedding photo ${item}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
              Khách hàng nói gì
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anh Minh & Chị Hoa",
                text: "Đội ngũ Wedding Dreams đã tạo ra những bức ảnh tuyệt vời cho đám cưới của chúng tôi. Chuyên nghiệp và tận tâm!",
                rating: 5,
              },
              {
                name: "Anh Tuấn & Chị Linh",
                text: "Dịch vụ makeup và chụp ảnh rất xuất sắc. Chúng tôi rất hài lòng với kết quả cuối cùng.",
                rating: 5,
              },
              {
                name: "Anh Đức & Chị Mai",
                text: "Bộ ảnh cưới ngoại cảnh tuyệt đẹp! Cảm ơn team đã tạo ra những kỷ niệm đáng nhớ.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-foreground">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-foreground mb-4">
              Liên hệ với chúng tôi
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hãy để chúng tôi biến ngày cưới của bạn thành kỷ niệm đẹp nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-serif font-semibold mb-6">
                Thông tin liên hệ
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@weddingdreams.vn</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tên của bạn"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Tin nhắn của bạn"
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Gửi tin nhắn
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h5 className="text-xl font-serif font-bold">Wedding Dreams</h5>
              </div>
              <p className="opacity-80">
                Chuyên cung cấp dịch vụ cưới hỏi chuyên nghiệp với chất lượng
                cao nhất.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Dịch vụ</h6>
              <ul className="space-y-2 opacity-80">
                <li>Chụp hình cưới</li>
                <li>Makeup cô dâu</li>
                <li>Chụp ngoại cảnh</li>
                <li>Chỉnh sửa ảnh/video</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Theo dõi chúng tôi</h6>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-background/20 text-background hover:bg-background hover:text-foreground bg-transparent"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-background/20 text-background hover:bg-background hover:text-foreground bg-transparent"
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center opacity-60">
            <p>&copy; 2024 Wedding Dreams. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { HomePage };
