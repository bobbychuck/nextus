import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

class TowerRadarScreen extends StatefulWidget {
  const TowerRadarScreen({super.key});

  @override
  State<TowerRadarScreen> createState() => _TowerRadarScreenState();
}

class _TowerRadarScreenState extends State<TowerRadarScreen> {
  double _sweepAngle = 0;
  late final Timer _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(milliseconds: 50), (_) {
      setState(() => _sweepAngle += 4);
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('UVL Tower — Charlotte Online')),
      body: CustomPaint(
        painter: RadarPainter(_sweepAngle),
        child: const Center(
          child: Text(
            'Mesh: 0 peers | Proximity Graph: You',
            style: TextStyle(color: Colors.greenAccent, fontSize: 16),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Facilitator: Morning standup ready. Intent?')),
        ),
        child: const Icon(Icons.mic),
      ),
    );
  }
}

class RadarPainter extends CustomPainter {
  final double sweepAngle;

  RadarPainter(this.sweepAngle);

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width, size.height) / 2 - 20;

    final ringPaint = Paint()
      ..color = Colors.green.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    for (int i = 1; i <= 5; i++) {
      canvas.drawCircle(center, radius * i / 5, ringPaint);
    }

    final sweepPaint = Paint()
      ..shader = RadialGradient(
        colors: [Colors.greenAccent.withOpacity(0.8), Colors.transparent],
      ).createShader(Rect.fromCircle(center: center, radius: radius));

    final path = Path()
      ..moveTo(center.dx, center.dy)
      ..arcTo(
        Rect.fromCircle(center: center, radius: radius),
        radians(sweepAngle - 10),
        radians(20),
        false,
      )
      ..close();

    canvas.drawPath(path, sweepPaint);

    final blipPaint = Paint()..color = Colors.greenAccent;
    canvas.drawCircle(center.translate(50, -80), 8, blipPaint);
    canvas.drawCircle(center.translate(-100, 40), 8, blipPaint);
  }

  double radians(double degrees) => degrees * pi / 180;

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
