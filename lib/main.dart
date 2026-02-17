import 'package:flutter/material.dart';

import 'ui/radar_screen.dart';

void main() => runApp(const UVLApp());

class UVLApp extends StatelessWidget {
  const UVLApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Urban Velocity League',
      theme: ThemeData.dark(useMaterial3: true),
      home: const TowerRadarScreen(),
    );
  }
}
